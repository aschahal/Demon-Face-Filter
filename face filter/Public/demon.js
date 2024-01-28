// -----JS CODE-----
//@input Component.FaceStretchVisual faceStretch
//@input Component.LiquifyVisual liquify
//@input Component.FaceMaskVisual demonMask
//@input Component.RenderMeshVisual mouth


script.createEvent("UpdateEvent").bind(Update);
script.createEvent("MouthOpenedEvent").bind(MouthOpened);
script.createEvent("MouthClosedEvent").bind(MouthClosed);

var wantintensity = 0;

function MouthOpened(){
    wantintensity = 1;
}

function MouthClosed(){
    wantintensity = 0;
}

function Update() {
    var currentIntensity = script.faceStretch.getFeatureWeight("Feature0");
    var intensity = lerp(currentIntensity, wantintensity, getDeltaTime() * 4);
    script.faceStretch.setFeatureWeight("Feature0", intensity);
    script.liquify.radius = intensity * 4;
    script.demonMask.mainMaterial.mainPass.baseColor = new vec4(1,1,1,intensity);
    script.mouth.mainMaterial.mainPass.baseColor = new vec4(0.15,0.15,0.15,intensity);
}

function lerp(start, end, t){
    return start * (1-t) + end * t;
}