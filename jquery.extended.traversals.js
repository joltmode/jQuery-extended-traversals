// Apparently jQuery works mostly with element type nodes (ELEMENT_NODE === 1),
// but, Selection API works with Text nodes only.
// Therefore, we are extending jQuery a little.

var rparentsprev = /^(?:parents|prev(?:Until|All))/;
// methods guaranteed to produce a unique set when starting from a unique set
var guaranteedUnique =
{
        childrenWithTypes: true,
        nextWithTypes: true,
        prevWithTypes: true
};

jQuery.extend({
    traverseWithTypes : function(types, element, direction, until)
    {
        var matched = [];
        var truncate = until !== undefined;

        while ((element = element[direction]) && element.nodeType !== 9)
        {
            // Look up element and additional types only.
            if (jQuery.inArray(element.nodeType, types) !== -1)
            {
                // Stop if enountered limiter.
                if (truncate && $(element).is(until))
                {
                    break;
                }

                matched.push(element);
            }
        }

        return matched;
    },
    siblingWithTypes : function(types, element, direction)
    {
        // Select next until it matches our types.
        while ((element = element[direction]) && jQuery.inArray(element.nodeType, types) === -1)
        {}

        return element;
    },
    siblingsWithTypes : function(types, element, self)
    {
        var matched = [];

        for ( ; element; element = element.nextSibling)
        {
            if (jQuery.inArray(element.nodeType, types) !== -1 && element !== self)
            {
                matched.push(element);
            }
        }

        return matched;
    }
});

jQuery.each({
    parentsWithTypes: function(element, index, types)
    {
        return jQuery.traverseWithTypes(types, element, 'parentNode');
    },
    parentsWithTypesUntil: function(element, index, options)
    {
        return jQuery.traverseWithTypes(options.types, element, 'parentNode', options.until);
    },
    nextWithTypes : function(element, index, options)
    {
        return jQuery.siblingWithTypes(options.types, element, 'nextSibling');
    },
    prevWithTypes : function(element, index, options)
    {
        return jQuery.siblingWithTypes(options.types, element, 'previousSibling');
    },
    nextWithTypesAll : function(element)
    {
        return jQuery.traverseWithTypes(options.types, element, 'nextSibling');
    },
    prevWithTypesAll : function(element)
    {
        return jQuery.traverseWithTypes(options.types, element, 'previousSibling');
    },
    nextWithTypesUntil : function(element, index, options)
    {
        return jQuery.traverseWithTypes(options.types, element, 'nextSibling', options.until);
    },
    prevWithTypesUntil : function(element, index, options)
    {
        return jQuery.traverseWithTypes(options.types, element, 'previousSibling', options.until);
    },
    siblingsWithTypes: function(element, index, options)
    {
        return jQuery.siblingsWithTypes(options.types, (element.parentNode || {}).firstChild, element);
    },
    childrenWithTypes: function(element, index, options)
    {
        return jQuery.siblingsWithTypes(options.types, element.firstChild);
    }
}, function (name, fn)
{
    jQuery.fn[name] = function(types, until, selector)
    {       
        var matched = jQuery.map(this, fn, {types : types, until : until});

        if (name.slice( -5 ) !== "Until")
        {
            selector = until;
        }

        if (selector && typeof selector === "string")
        {
            matched = jQuery.filter(selector, matched);
        }

        if (this.length > 1)
        {
            // Remove duplicates.
            if (!guaranteedUnique[ name ])
            {
                jQuery.unique(matched);
            }

            // Reverse order for parents* and prev-derivatives.
            if (rparentsprev.test(name))
            {
                matched.reverse();
            }
        }

        return this.pushStack(matched);
    };
});
