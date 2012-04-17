# Gunpowder 

Gunpowder is a behaviour-driven development tool for Unity3D that allows you to make the best games, like ever.

## Pivotal Tracker Project 

https://www.pivotaltracker.com/projects/456391/

## Setup

5 easy steps:

1. Import the Gunpowder package into your project
2. In your scene, create an empty game object and call it Spec Runner
3. Create a new javascript file and call it something like MySceneSpec
4. (optional) Copy the code from the template.js file to get started
5. Attach MySceneSpec to your Spec Runner game object

That's it!

## Matchers

Example: expect(find('object name')).toExist();

- `toExist()`
- `toBeTruthy()`
- `toBeFalsy()`
- `toEqual(object)`
- `toHavePosition(x, y, z)`
- `toBeVisible()`
- `toBeHidden()`
- `toHaveColor(Color)`

## Selector Actions

Note these actions are chainable.

Example: find('object name').moveTo(1, 1, 1);

- `moveTo(x, y, z)`
- `mouseEnter(scriptName)`
- `mouseExit(scriptName)`

## Simulating Input

Note when using the below methods, you'll have to make sure and use Gunpowder's built in input methods. This is so the test framework can fake user input.

- `move('forward|backward|left|right', milliseconds, callback)`
  - controls Gunpowder.Input.GetAxis
- `pressButton('Fire1', milliseconds, callback)`
  - controls Gunpowder.Input.GetButton
- `pressKey('a', milliseconds, callback)`
  - controls Gunpowder.Input.GetKey

## Event Waiting

- `waits(milliseconds, callback)`

## Known Limitations :(

- Can only have one spec file per project.

## Contributions

I would love help from anybody since this is my first time creating a testing framework and I know there are people out there MUCH smarter than me! :D Send the ol' pull request and I'll get to it right away. Please include tests though. ;) 

Thank you!
