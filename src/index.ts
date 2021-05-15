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
  marking: Token[];
  fire(name: string): void;
  add(token: Token): void;
};

export default function petrinet(
  places: Place[],
  transitions: Transition[]
): PetriNet {
  const _tokens: Token[] = places.map((p) => ({ place: p.key, amount: 0 }));

  // Function that adds tokens to a given marking
  function add(token: Token): void {
    const index = _tokens.findIndex((m) => m.place === token.place);
    if (index < 0) return;
    _tokens[index] = { ...token, amount: token.amount + _tokens[index].amount };
  }

  // Function to remove tokens from the given marking
  function removeToken(place: string): void {
    const index = _tokens.findIndex((m) => m.place === place);
    _tokens[index] = { place, amount: _tokens[index].amount - 1 };
  }

  // function to determine if a transition can fire
  function canFire(places: InputArc[]): boolean {
    return places.every((p) =>
      _tokens.find((t) => t.place === p.source && t.amount > 0)
    );
  }

  function fire(name: string): void {
    const transition = transitions.find((t) => t.key === name);
    if (!transition || !canFire(transition.input)) return;

    // Consuming & producting tokens
    for (let i = 0; i < transition.input.length; i++) {
      const arc = transition.input[i];
      removeToken(arc.source);
    }

    // produce new tokens based on the transition definition
    for (let i = 0; i < transition.output.length; i++) {
      const arc = transition.output[i];
      add({ place: arc.target, amount: 1 });
    }
  }

  return {
    fire,
    add,
    get marking() {
      return _tokens.filter((t) => t.amount > 0);
    },
  };
}
