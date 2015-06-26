package CopyToClipboard
{
	import flash.desktop.Clipboard;
	import flash.desktop.ClipboardFormats;
	import flash.display.SimpleButton;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.text.TextFormat;
	import flash.external.ExternalInterface;
	import flash.display.StageScaleMode;
	import flash.display.StageAlign;
	
	/**
	 * ...
	 * @author http://github.com/korve
	 */
	public class Main extends Sprite 
	{
		/**
		 * html element id to identify this clipboard
		 */
		private var id:String;
		
		/**
		 * Data to copy to the clipboard (passed by flashVars as 'data')
		 */
		private var clipboardData:String;
		
		private var btn:Sprite;
		
		public function Main():void 
		{
			if (ExternalInterface.available) 
			{
				ExternalInterface.addCallback("setClipboardData", function(data:String):void {
					setData(data);
				});
			}
			
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			stage.scaleMode = StageScaleMode.EXACT_FIT;
			stage.align = StageAlign.TOP_LEFT;
			
			// read clipboard data
			this.setId(stage.loaderInfo.parameters['id']);
			this.setData(stage.loaderInfo.parameters['data']);
			
			var bgcolor:uint = uint(stage.loaderInfo.parameters['bgcolor']) || 0x000000;
			
			if ( ! this.clipboardData)
				this.clipboardData = null;
			
			// button
			var btn:Sprite = this.btn = new Sprite();
			btn.graphics.beginFill(bgcolor);
			btn.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
			btn.graphics.endFill();

			btn.buttonMode = true;
			btn.useHandCursor = true;
			btn.mouseChildren = false;
			
			// add to stage
			this.addChild(btn);
			
			// add events
			btn.addEventListener(MouseEvent.CLICK, this.btn_Click);
			
			if (ExternalInterface.available) 
			{
				ExternalInterface.call("clipboard.loaded", this.id);
			}
		}
		
		private function btn_Click(e:MouseEvent):void 
		{
			if(this.clipboardData !== null)
			{
				Clipboard.generalClipboard.setData(ClipboardFormats.TEXT_FORMAT, this.clipboardData);
				
				if (ExternalInterface.available) 
				{
					ExternalInterface.call("clipboard.copied", this.id);
				}
			}
		}
		
		public function setId(id:String):void 
		{
			this.id = id;
		}
		
		public function setData(data:String):void 
		{
			this.clipboardData = data;
			if (ExternalInterface.available) 
			{
				ExternalInterface.call("clipboard.changed", this.id);
			}
		}
	}
	
}