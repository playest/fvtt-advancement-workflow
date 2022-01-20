interface CharacterSheet {
    classes: Class[],
    feats: Feature[],
    boons: Feature[],
}

interface Class {
    subclasses: Subclasses[],
    features: Feature[],
}

interface Background {
    features: Feature[],
}

interface Race {
    subraces: Subrace[],
    features: Feature[],
}

interface Subrace {
    features: Feature[],
}

interface Subclasses {
    features: Feature[],
}

interface Feature {
    // Something
}

export {}; // make it a module so that it does not pollute the global namespace