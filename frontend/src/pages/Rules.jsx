import './Page.css';

function Rules() {
  return (
    <div id="rules-page" className="page">
        <h2>Rules</h2>
        <p>Basically it's 2 hand ninja rules with a twist. 
          On your turn you can either perform a regular Ninja move or cast a spell, but play otherwise proceeds as Ninja normally does.
        </p>
        <h2>Battle Prep</h2>
        <p>Before the battle begins, the Arbiter will announce the Mana Limit and specify any special environmental conditions that apply to the battlefield.
          Each player must then select the spells (cards) they wish to bring into battle. The total combined cost of these spells must not exceed the Mana Limit. This set of chosen spells is referred to as the player's Grimoire.
        </p>
        <p>After both players have finalized their Grimoires, the Arbiter will determine which player goes first. This can be decided randomly or by any method the Arbiter deems appropriate.
          Both players must then assume the ready position. The battle officially begins when the Arbiter gives the command: “Begin!”
        </p>
        <h2>Combat</h2>
        <p>Each player will take a turn, starting with the first player and going clockwise. 
          On their turn, a player may perform one of the following actions:
        </p>
        <ul>
          <li>Standard Move.</li>
          <li>Cast a spell.</li>
        </ul>
        <p>
          Players continue to take turns until only one player remains.
        </p>
        <h3>Standard Move</h3>
        <p>A Standard Move may be made without calling anything out and as soon as the previous player ends their turn. 
          The Standard Move does not necessarily have to be an attack, the player is free to move in any way they like - as long as it is one continuous movement. 
          The Arbiter will decide if the player's movement is reasonable.
        </p>
        <p>The only way to cause damage during the Standard Move is with something tagged as "lethal". 
          Players begin play with all of their hands marked as "lethal".
          Performing a Standard Move prevents a player from also casting a spell on their turn.
        </p>
        <h3>Cast a Spell</h3>
        <p>To cast a spell, a player must have at least one unexhausted spell in their Grimoire. 
          The player must call out "I Cast...", followed by the spell's full name.
        </p>
        <p>
          A player may only cast one spell per turn, and every successfully cast spell immediately becomes exhausted.
          Casting a spell prevents a player from performing a Standard Move on their turn, unless the spell has the "swift" keyword.
        </p>
        <h3>Dodging</h3>
        <p>A player may always Dodge an incoming attack, even if it is not their turn. 
          A Dodge is a purely defensive action, no attacks can be made during a Dodge.
          A Dodge may be used to reposition, but only in direct response to the incoming attack. 
          The Arbiter will determine if a player's Dodge is reasonable.
        </p>
        <h3>Taking damage</h3>
        <p>Players begin each battle with 2 Hit Points.
          Each time a player is hit with something tagged as "lethal" on something tagged as "fragile", they lose 1 HP.
          Players begin play with all of their hands marked as "fragile".
        </p>
        <p>
          Anything that has its HP reduced to 0 must be removed from the battlefield.
          If a player has 0 HP, they have lost and must exit the battlefield. 
        </p>
        <h2>Keywords</h2>
        <ul>
          <li><strong>Lethal</strong>: A body part, an item, or a construct that is able to deal HP damage after striking a "fragile" target.</li>
          <li><strong>Fragile</strong>: A body part, an item, or a construct that loses one (1) HP upon being struck by something "lethal".</li>
          <li><strong>Swift</strong>: A spell that still allows a player to perform their Standard Move on their turn.</li>
          <li><strong>Construct</strong>: Any item that is conjured by a player during battle.</li>
          <li><strong>Grimoire</strong>: The set of active spells that a player has brought into the battle.</li>
          <li><strong>Interrupt</strong>: A spell or effect that stops all play to perform its action.</li>
          <li><strong>Trap</strong>: A spell that is not revealed when cast, and may interrupt play when its conditions are met.</li>
        </ul>
    </div>
  )
}

export default Rules