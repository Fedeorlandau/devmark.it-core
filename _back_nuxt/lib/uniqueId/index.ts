//----------------------------------------------------------------------------//
//                        locally unique Id Generator                         //
//----------------------------------------------------------------------------//

let IdCounter = 0; // hidden in the closure of "nextId"

function nextId(): number {
  // a really unique incrementor function
  return ++IdCounter;
}

function uniqueId(): string {
  return "dmk-" + nextId();
}

export default uniqueId;
