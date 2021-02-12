type Place = { key: string };
type InputArc = { source: string };
type OutputArc = { target: string };
type Transition = {
  key: string;
  input: InputArc[];
  output: OutputArc[];
};

type Token = { place: string; amount: number };

type PetriNet = {
  current: Token[];
  fire(name: string): PetriNet;
  addToken(token: Token): PetriNet;
};

type PetriNetConfig = {
  places: Place[];
  transitions: Transition[];
  initialMarking: Token[];
};

export function petrinet(config: PetriNetConfig): PetriNet {
  let _marking = config.initialMarking;

  // Function that adds tokens to a given marking
  function addToken(token: Token, marking: Token[]): void {
    const i = marking.findIndex((m) => m.place === token.place);
    if (i < 0) marking.push(token);
    else marking[i] = { ...token, amount: token.amount + marking[i].amount };
  }

  function fireTransition(transition: Transition): void {
    const newMarking = [..._marking];
    let canFireTransition = true;

    // Consuming & producting tokens
    for (let i = 0; i < transition.input.length; i++) {
      const arc = transition.input[i];
      const index = _marking.findIndex((m) => m.place === arc.source);

      // Check if consumption can happen for a transition
      if (index < 0) {
        canFireTransition = false;
        break;
      }

      // set the new marking based on consumption only
      const newAmount = _marking[index].amount - 1;
      newMarking[index] = { place: arc.source, amount: newAmount };
    }

    // if we cannot fire, stop the function
    if (!canFireTransition) return;

    // produce new tokens based on the transition definition
    for (let i = 0; i < transition.output.length; i++) {
      const arc = transition.output[i];
      addToken({ place: arc.target, amount: 1 }, newMarking);
    }

    // set the new marking
    _marking = newMarking.filter((t) => t.amount > 0);
  }

  return {
    get current() {
      return _marking;
    },
    fire(name) {
      const transition = config.transitions.find((t) => t.key === name);
      if (!transition) return this;

      fireTransition(transition);
      return this;
    },
    addToken(token) {
      addToken(token, _marking);
      return this;
    },
  };
}
