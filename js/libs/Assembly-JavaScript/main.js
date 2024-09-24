class Viewport extends GameBehavior{#e=0;Awake(){Crispixels.effect=!0,SceneManager.Load(1,2)}Update(){if(Input.GetKeyDown(KeyCode.F2))switch(this.#e++,3===this.#e&&(this.#e=0),this.#e){case 0:FPSMeter.enabled=!1,FPSMeter.msMode=!1;break;case 1:FPSMeter.enabled=!0;break;case 2:FPSMeter.msMode=!0}Input.GetKeyDown(KeyCode.F4)&&(Window.fullscreen=!Window.fullscreen),Input.GetKeyDown(KeyCode.Z)?this.#n(-1):Input.GetKeyDown(KeyCode.X)&&this.#n(1),FPSMeter.Update()}#n(e){if(0===SceneManager.loadedSceneCount)return;let n=this.gameObject.scene.index+e;n=Math.Clamp(n,0,SceneManager.sceneCount-1),SceneManager.SetActiveScene(n)}}class RPGMovement extends GameBehavior{#e=!0;#t=!1;#o=0;#r=0;#i=Vector2.zero;#s=Vector2.zero;#a=Vector2.zero;_moveDir=Vector2.zero;get _shouldMove(){return this.updateMovement}updateMovement=!0;speed=1;speedScale=1;tileSize=new Vector2(.5,.5);onMoveStart=new DelegateEvent;onStop=new DelegateEvent;#n(){this._moveDir=this.#i,this.#s=Vector2.Scale(this._moveDir,this.tileSize)}#h(){this.#t||(this.#t=!0,this.onMoveStart.Invoke());const e=Vector2.Add(this.transform.position,Vector2.Scale(this._moveDir,Time.deltaTime*this.#r));if(Vector2.Abs(Vector2.Subtract(e,this.#a)).Greater(Vector2.Abs(this.#s)))return this.#i=Vector2.zero,this._moveDir=Vector2.zero,this.transform.position=Vector2.Add(this.#a,this.#s),this.#t=!1,this.#e=!0,this._OnStop(),void this.onStop.Invoke();this.transform.position=e,this._OnMove()}Update(){this._moveDir.Equals(Vector2.zero)&&(this._OnMovementGet(),this.#n(),this.#o=this.speedScale,this.#r=this.speed*this.#o,this.#a=this.transform.position),this._moveDir.Equals(Vector2.zero)?(this.#e=!0,this._OnStay()):this._shouldMove&&this.#h()}_OnMovementGet(){}_OnMove(){}_OnStop(){}_OnStay(){}MoveTowards(e){this.#e&&(this.#e=!0,this.#i=Vector2.Clamp(e,Vector2.Scale(Vector2.one,-1),Vector2.one))}}class CharController extends RPGMovement{#e=[];#t=null;#i=!1;#r=!1;#s=0;#n=0;Start(){const e=Resources.Find("sprites/characters/yoki").sprites;for(let t=0;t<e.length;t++){const i=e[t].Duplicate();this.#e[t]=i}this.#t=this.GetComponent("SpriteRenderer")}Update(){this.#o(),super.Update()}_OnMovementGet(){this.#r=!1;const e=new Vector2(+Input.GetKey(KeyCode.ArrowRight)-+Input.GetKey(KeyCode.ArrowLeft),+Input.GetKey(KeyCode.ArrowUp)-+Input.GetKey(KeyCode.ArrowDown));0!==e.x?this.#s++:0!==this.#s&&(this.#s=0),0!==e.y?this.#n++:0!==this.#n&&(this.#n=0),Vector2.Abs(e).Equals(Vector2.one)&&(this.#s>this.#n?e.x=0:e.y=0),this.MoveTowards(e),this.speedScale=this.#i?2:1}_OnMove(){this.#r=!0}#o(){this.#i=Input.GetKey(KeyCode.Shift)}}class CameraController extends Viewport{#t=null;clampMin=new Vector2(0,0);clampMax=new Vector2(9.5,0);Start(){this.#t=GameObject.Find("char_yoki").transform}LateUpdate(){const t=this.#t.position,a=new Vector2(Math.Clamp(t.x,this.clampMin.x,this.clampMax.x),Math.Clamp(t.y,this.clampMin.y,this.clampMax.y));this.transform.position=a}}class Test extends GameBehavior{i=0;ren=null;spr=null;Start(){this.ren=this.GetComponent("Renderer"),this.spr=this.ren.sprite.texture.sprites}Update(){Input.GetKeyDown(KeyCode.ArrowRight)?this.i++:Input.GetKeyDown(KeyCode.ArrowLeft)&&this.i--,this.i<0?this.i=this.spr.length-1:this.i===this.spr.length&&(this.i=0),this.ren.sprite=this.spr[this.i]}}