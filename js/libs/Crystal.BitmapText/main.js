class FontAtlas{lineHeight=20;texture=null;constructor(t,e){this.texture=t;for(let t=0;t<e.length;t++){const r=new Sprite(e[t].character,this.texture,e[t].rect);this.texture.sprites.push(r)}}GetGlyph(t){return this.texture.sprites.find((e=>e.name===t))}}class FontGlyph{character="";rect=null;constructor(c,t){this.character=c??"",this.rect=t??new Rect}}class TextChar{#t=[];#r=Vector2.zero;#e=Vector2.zero;#s=new Color(1,1,1);trisCount=0;textureArray=[];localVertexArray=[];colorArray=[];parent=null;get vertexArray(){return this.#t}set vertexArray(t){this.#t=t,this.#o()}get position(){return this.#r}set position(t){this.#r=t,this.#o()}get offset(){return this.#e}set offset(t){this.#e=t,this.#o()}get color(){return this.#s}set color(t){this.#s=t;const r=[t.r,t.g,t.b,t.a];this.colorArray=[...r,...r,...r,...r,...r,...r],this.parent.RemapGraphicArrays()}#o(){const t=this.#r.x+this.#e.x,r=this.#r.y-this.#e.y;let e=[...this.#t];for(let s=0;s<this.trisCount;s++){const o=2*s;e[o]+=t,e[o+1]-=r}this.localVertexArray=e}}class Text extends Renderer{#t=!1;#e=!1;#i=!1;#s=!1;#r=0;#h=0;#o=0;#n=8.5;#a=1.5;#l=1;#c="";#u=[];#d=[];#g=[];#x=[];#f=Vector2.zero;#p=Vector2.zero;#w=new Bounds;#m=Vector2.one;#V=null;#y=null;characters=[];pivot=new Vector2(.5,.5);get meshChanged(){return this.#t}get bounds(){return new Bounds(this.#w.center,this.#w.size)}get fontSize(){return this.#l}set fontSize(t){this.#l=t,this.#z()}get font(){return this.#V}set font(t){this.#V=t,this.#M(),this.#z()}get width(){return this.#n}set width(t){this.#n=t,this.#t=!0}get height(){return this.#a}set height(t){this.#a=t,this.#t=!0}get overflowWidth(){return this.#i}set overflowWidth(t){this.#i=t,this.#t=!0}get overflowHeight(){return this.#s}set overflowHeight(t){this.#s=t,this.#t=!0}get horizontalAlign(){return this.#r}set horizontalAlign(t){this.#r=t,this.#e=!0}get verticalAlign(){return this.#h}set verticalAlign(t){this.#h=t,this.#e=!0}get text(){return this.#c}set text(t){this.#c!==t&&(this.#c=t,this.#M())}get pixelPerUnit(){return this.font.texture.pixelPerUnit}get localToWorldMatrix(){return Matrix3x3.Multiply(this.transform.localToWorldMatrix,Matrix3x3.TRS(Vector2.Scale(this.pivot,new Vector2(-this.#n,-this.#a)),0,this.#m))}#A=class{lineBreak=!1;space=!1;width=0;height=0;sprites=[];Add(t){this.sprites.push(t)}Update(){let t=0,e=0;for(let i=0;i<this.sprites.length;i++){const s=this.sprites[i].rect;t+=s.width,e<s.height&&(e=s.height)}this.width=t,this.height=e}};constructor(t,e){super(e),this.Reload(),this.font=t}#v(t,e){const i=t.vertices,s=i[0],r=t.triangles;let h=[],o=[];for(let t=0;t<r.length;t++){const e=i[r[t]],n=2*t;h[n]=e.x-s.x,h[n+1]=e.y-s.y,o[n]=e.x,o[n+1]=e.y}const n=new TextChar;return n.parent=this,n.trisCount=r.length,n.vertexArray=h,n.textureArray=o,n.position=e,n.color=this.#y.Duplicate(),n}#M(){const t=this.#c;let e=[new this.#A];for(let i=0;i<t.length;i++){const s="\n"===t[i];let r=null;s||(r=this.font.GetGlyph(t[i]))," "!==t[i]?s?(0!==i&&(e[e.length-1].Update(),e.push(new this.#A)),e[e.length-1].lineBreak=!0,e.push(new this.#A)):(e[e.length-1].space&&(e[e.length-1].Update(),e.push(new this.#A)),e[e.length-1].Add(r)):(0===i||e[e.length-1].space||(e[e.length-1].Update(),e.push(new this.#A)),e[e.length-1].Add(r),e[e.length-1].space=!0)}e[e.length-1].Update(),this.#u=e,this.#t=!0}#z(){const t=this.pixelPerUnit/this.#l,e=this.font.texture,i=e.width,s=e.height;this.#m=Vector2.Scale(i>s?new Vector2(1,s/i):new Vector2(i/s,1),i>s?i/t:s/t),this.#t=!0}#G(t,e){const i=this.#V.texture.width;let s=e.x,r=[];for(let h=0;h<t.length;h++){const o=t[h],n=o.rect.width/i,a=this.#v(o,new Vector2(s,-e.y));r.push(a),s+=n}return r}#S(){const t=this.pixelPerUnit/this.#l,e=this.#n/(this.#V.texture.width/t),i=this.#a/(this.#V.texture.height/t),s=this.#d,r=.5*(i-this.#o)*this.#h,h=this.characters;let o=0,n=0,a=s[0].count,l=.5*(e-s[0].size)*this.#r,c=[],u=[],d=[],g=[],x=[];for(let t=0;t<h.length;t++){if(0!==this.horizontalAlign){if(0===a){n++;const t=s[n];a=t.count,l=.5*(e-t.size)*this.#r}a--}h[t].offset=new Vector2(l,r);const i=h[t].trisCount,f=o+i;c.push(...h[t].localVertexArray),u.push(...h[t].textureArray),d.push(...h[t].colorArray),x.push(o),o=f,g.push(i-1)}this.material.SetBuffer(this.geometryBufferID,c),this.material.SetBuffer(this.textureBufferID,u),this.material.SetBuffer(this.colorBufferID,d),this.#g=g,this.#x=x,this.#e=!1}RecalcBounds(){const t=this.pivot,e=this.#p;let i=Vector2.zero;switch(this.horizontalAlign){case 0:i.x+=e.x;break;case 2:i.x-=e.x}switch(this.verticalAlign){case 0:i.y-=e.y;break;case 2:i.y+=e.y}const s=new Bounds(Vector2.zero,this.#f),r=this.transform.localToWorldMatrix,h=Matrix3x3.Multiply(r,Matrix3x3.Translate(s.min)),o=Matrix3x3.Multiply(r,Matrix3x3.Translate(new Vector2(s.min.x,s.max.y))),n=Matrix3x3.Multiply(r,Matrix3x3.Translate(new Vector2(s.max.x,s.min.y))),a=Matrix3x3.Multiply(r,Matrix3x3.Translate(s.max));s.SetMinMax(new Vector2(Math.min(h.GetValue(2,0),o.GetValue(2,0),n.GetValue(2,0),a.GetValue(2,0)),Math.min(-h.GetValue(2,1),-o.GetValue(2,1),-n.GetValue(2,1),-a.GetValue(2,1))),new Vector2(Math.max(h.GetValue(2,0),o.GetValue(2,0),n.GetValue(2,0),a.GetValue(2,0)),Math.max(-h.GetValue(2,1),-o.GetValue(2,1),-n.GetValue(2,1),-a.GetValue(2,1))));const l=Matrix3x3.Multiply(r,Matrix3x3.Translate(Vector2.Add(i,Vector2.Scale(new Vector2(.5-t.x,.5-t.y),2))));s.center=new Vector2(l.GetValue(2,0),-l.GetValue(2,1)),this.#w=s,super.RecalcBounds()}ForceMeshUpdate(){this.#y=this.color;const t=this.pixelPerUnit/this.#l,e=this.#V.texture.width,i=this.#V.texture.height,s=e/t,r=i/t,h=this.#n/s,o=this.#a/r,n=this.font.lineHeight/i;let a=0,l=0,c=n,u=[],d=[{size:0,count:0}],g=0;for(let t=0;t<this.#u.length;t++){const s=this.#u[t];if(s.lineBreak){if(0!==a){const t=d[d.length-1].size;t>g&&(g=t),d.push({size:0,count:0})}l+=c,a=0,c=n;continue}const r=s.width/e,x=!this.#i&&a+r>h;if(0===a&&x&&!s.space){const t=s.sprites;let r=!1;for(let s=0;s<t.length;s++){const x=t[s],f=x.rect.width/e;if(!this.overflowWidth&&a+f>h){const t=d[d.length-1].size;t>g&&(g=t),l+=c,a=0,c=n,d.push({size:0,count:0})}const p=x.rect.height/i;if(c<p&&(c=p),!this.overflowHeight&&l+p>o){r=!0;break}const w=this.#v(x,new Vector2(a,-l));u.push(w),a+=f,d[d.length-1].size+=f,d[d.length-1].count++}if(r)break;continue}if(x){const t=d[d.length-1].size;t>g&&(g=t),l+=c,a=0,c=n,d.push({size:0,count:0})}const f=s.height/i;if(c<f&&(c=f),!this.#s&&l+c>o)break;if(s.space){if(0===a)continue;if(!this.#i){const i=this.#u[t+1];if(null==i||a+r+i.width/e>h){const t=d[d.length-1].size;t>g&&(g=t),l+=c,a=0,c=n,d.push({size:0,count:0});continue}}}const p=this.#G(s.sprites,new Vector2(a,l));u.push(...p),a+=r,d[d.length-1].size+=r,d[d.length-1].count+=s.sprites.length}const x=d[d.length-1].size;x>g&&(g=x),this.#s&&(l+=n),this.characters=u,this.#d=d,this.#o=l;const f=new Vector2(g*s,(this.#s?l:Math.min(l,o))*r);this.#f=f,this.#p=Vector2.Scale(new Vector2(f.x-h*s,o*r-f.y),.5),this.#t=!1,this.#S(),super.ForceMeshUpdate()}RemapGraphicArrays(){this.#e=!0}Render(){if(!this.isLoaded||!this.gameObject.activeSelf)return;this.#y!==this.color&&this.ForceMeshUpdate();const t=this.characters;if(0===t.length)return;this.#e&&this.#S();const e=this.material.gl,i=this.renderMatrix;this.material.SetMatrix(this.uMatrixID,i.matrix[0][0],i.matrix[0][1],i.matrix[0][2],i.matrix[1][0],i.matrix[1][1],i.matrix[1][2],i.matrix[2][0],i.matrix[2][1],i.matrix[2][2]),this.material.SetAttribute(this.aVertexPosID,this.geometryBufferID),this.material.SetAttribute(this.aTexturePosID,this.textureBufferID),this.material.SetAttribute(this.aColorID,this.colorBufferID),e.useProgram(this.material.program),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.font.texture.GetNativeTexture()),Application.gl_multidraw.multiDrawArraysWEBGL(e.TRIANGLE_STRIP,this.#x,0,this.#g,0,t.length),e.useProgram(null)}}class TextAnchorX{static get Left(){return 0}static get Center(){return 1}static get Right(){return 2}}class TextAnchorY{static get Top(){return 0}static get Middle(){return 1}static get Bottom(){return 2}}