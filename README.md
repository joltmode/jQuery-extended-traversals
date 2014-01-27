jQuery Extended Traversals
==========================

jQuery extension that provides traversal methods with additional nodeType selection support.

Methods
-------
- `nextWithTypes` — Selects next node matching given types. `$('strong').nextWithTypes([Node.TEXT_NODE])` would select next node with Text nodeType (3).
- `prevWithTypes` — Same as above, but select previous.
- `nextAllWithTypes` — Selects all following siblings.
- `prevAllWithTypes` — Select all preceding siblings.
- `nextUntilWithTypes` — Select all until. `$('strong').nextUntilWithTypes([Node.TEXT_NODE, Node.ELEMENT_NODE], 'a')` would select all nodes until `a` including both - text nodes and element nodes.
- `prevUntilWithTypes` — Same as above, but select preceding.
- `siblingsWithTypes` — Get all siblings matching given types.
- `childrenWithTypes` — Get all children matching given types.

Where each method has a new additional argument (first) `types` which should be an array consiting of [Node type identifiers](https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeType).
