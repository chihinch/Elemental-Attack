# Elemental Attack: Revenge of the Atoms

## Background

Elemental Attack is an in-browser arcade shooter game with a chemical twist. 

In retaliation for the player not paying enough attention in chemistry class, they face an onslaught of attacks from rogue atoms of different elements. The player must use their two prized possessions: an ioniser and an electron gun, to neutralize these atoms and render them harmless.

## Rules

(Warning: quick chemistry lesson ahead!)

Atoms have a valence shell containing a certain amount of electrons, depending on the element. They create chemical bonds with each other to create compounds, following the [octet rule](https://en.wikipedia.org/wiki/Octet_rule). 

In other words, elements seek to have a fully-occupied valence shell containing 8 electrons (or 2, for certain elements).

In this game, atoms of various elements fall from the top towards the player at the bottom. While surviving neutron attacks from these atoms, the player must use their two weapons against them to complete their valence shells.

* Ioniser: this weapon shoots the perfect amount of ionisation energy to remove one electron from the atom.
* Electron gun: this weapon shoots electrons at atoms to fill up the valence shell.

While the ioniser has unlimited energy (because magic), the electron gun has limited ammunition and can be refilled by successful hits from the ioniser.

To keep the game simple, elements can only be attacked with one of the two weapons, depending on their most common [oxidation state](https://en.wikipedia.org/wiki/Oxidation_state). Those with positive oxidation states are immune to the electron gun, and those with negative oxidation states are immune to the ioniser.

The player gains points for each neutralized atom.

The player loses health if they are hit by a neutron attack, or if an atom reaches the bottom of the screen. They can restore health by capturing noble gas atoms that occasionally fall down.

After some time, the game gets progressively harder as larger elements are introduced.

The game ends when the player's heath reaches zero.

## Functionality and MVP

In Elemental Attack, players will be able to:

- [ ] Start, pause, and restart the game
- [ ] Use keyboard controls to attack and move along the bottom of the screen
- [ ] Check if an attack is valid depending on the weapon used and the target atom
- [ ] Lose health when an atom's neutron attack hits the player, or when an atom reaches the bottom of the screen
- [ ] Gain health when a noble gas is captured
- [ ] Track their electron gun's ammunition, disabling the gun if it's empty
- [ ] Regain usage of the electron gun when their ioniser successfully hits an atom
- [ ] Gain points for each atom that was neutralized
- [ ] Lose the game when their health reaches zero

Additionally, the project will include:
- [ ] An About modal containing instructions and rules
- [ ] A picture of a periodic table for reference

## Wireframes

This app will consist of a single screen with the game canvas, game controls via keyboard, the About and Periodic Table modals, nav links to GitHub, LinkedIn, and my personal website.

![Wireframe example](https://github.com/chihinch/Elemental-Attack/blob/master/wireframe.png)

## Technologies

This project will be implemented with the following technologies:

* Vanilla JavaScript for overall structure and game logic,
* HTML5 Canvas for DOM manipulation and rendering
* Webpack to bundle and serve up the JavaScript content

In addition to the entry file, the following scripts are involved in this project:

* game.js: handles the logic for creating and updating the necessary DOM elements
* player.js: creates the player character and its abilities
* atoms.js: generates atoms, their properties, and their behaviour

## Implementation Timeline

### Day 1:

* Become familiar with HTML5 Canvas and go over MDN's Breakout game tutorial
* Setup the Node modules and webpack configuration
* Write a basic entry file and skeleton for scripts

### Day 2: work on Player

* Setup the app interface: canvas, navlinks, modals
* Fill in the logic for the player character:
  * Rendering the character as it moves
  * Tracking health and ammo
  * Responding to keyboard commands

### Day 3: work on Atoms

* Compile information about the elements:
  * Atomic symbol
  * Number of valence electrons
  * Most common oxidation state
  * Atomic radius
  * Atomic mass
* Generate Atoms, sizing them and setting their speed according to their atomic radius
* If enough time elapses, generate bigger atoms
* Handle Atom collisions with the bottom of the board

### Day 4: work on combat

* Make Atoms attack at set intervals according to their atomic mass
* Handle attacks from the player towards the Atoms, accounting for type of attack used and the atom's primary oxidation state
* Handle unmounting Atoms and point tracking when they are defeated

### Day 5: finishing touches and styling
* Create controls to start, pause, and reset the game
* Style the canvas/app and make sure that the atoms and the player are nicely styled as well

### Weekend

* Test the project for bugs
* Deploy the project on GitHub Pages