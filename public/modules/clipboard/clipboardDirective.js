/**
 * Created by andre (http://korve.github.io/) on 06.12.2014
 */

angular.module('reepioClipboardDirective', [])
	.value('clipboardSwf', 'CopyToClipboard.swf')
	.value('clipboardExpressInstallSwf', 'expressInstall.swf')
	.factory('clipboardDirectiveIdService', [function () {
		var id = 0;

		return {
			getUniqueId: function () {
				return 'clipboard-' + id++;
			}
		};
	}])
	.directive('reepioClipboard', ['converterService', 'clipboardSwf', 'clipboardExpressInstallSwf', 'clipboardDirectiveIdService',
		function (converterService, clipboardSwf, clipboardExpressInstallSwf, clipboardDirectiveIdService) {

		var params = {
			menu: "false",
			scale: "noScale",
			allowFullscreen: "false",
			allowScriptAccess: "always",
			bgcolor: "",
			wmode: "transparent"
		};

		return {
			restrict: 'EA',
			transclude: true,
			scope: {
				data: '=clipboardData',
				onCopied: '=?'
			},
			template: function (tElement, tAttrs, transclude) {
				tAttrs.id = clipboardDirectiveIdService.getUniqueId();
				return '<div class="btn-clipboard"><div id="' + tAttrs.id + '"></div><span ng-transclude></span></div>';
			},
			link: function (scope, el, attrs) {
				var flashObj;

				if( typeof swfobject === 'undefined')
					throw new Error("swfobject is required");

				var bgColor = angular.element(el).find('.btn-clipboard').css('background-color');

				// gets called by flash ExternalInterface
				window.clipboard = {
					loaded: function() {
						flashObj.setClipboardData(scope.data);
					},
					copied: function() {
						if(scope.onCopied)
							scope.onCopied(el);
					}
				};

				var flashvars = {
					data: scope.data,
					bgcolor: '0x' + converterService.rgb2hex(bgColor)
				};

				var attributes = {
					id: attrs.id
				};

				swfobject.embedSWF(
					clipboardSwf,
					attrs.id, "100%", "100%", "10.0.0",
					clipboardExpressInstallSwf,
					flashvars, params, attributes, function(e) {
						if( ! e.success)
						{
							el.remove();
							throw new Error("Could not initialize " + reepioClipboardSwf);
						}

						flashObj = document.getElementById(e.id);
					});

				scope.$watch('data', function (newValue) {
					if( ! flashObj || ! newValue)
						return;

					if(flashObj.setClipboardData)
						flashObj.setClipboardData(newValue);
				});
			}
		}
	}]);