function Update() {
  if(Gunpowder.Input.GetButton('Fire1')) {
    renderer.enabled = false;
  }
}

function OnMouseEnter() {
  renderer.material.color = Color.green;
}

function OnMouseExit() {
  renderer.material.color = Color.yellow;
}