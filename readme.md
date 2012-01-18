Gunpowder is a BDD tool for Unity3D that allows you to make the best games, like ever.

Pivotal Tracker Project: https://www.pivotaltracker.com/projects/456391/

To get started using gunpowder:

1. Import the gunpowder.js asset into your project located in tests/gunpowder/Assets/
2. In your scene, create an empty game object and call it SpecRunner
3. Create a new javascript file and call it something like MySceneSpec
4. Add this code to that file

    class MySceneSpec extends gunpowder {
      function run() {
        // your tests go here
      }
    }

5. Attach MySceneSpec to your SpecRunner game object
6. Done. Now start writing your specs and make an awesome game!

The DSL will be posted soon so for now just check out the specs for the gunpowder.