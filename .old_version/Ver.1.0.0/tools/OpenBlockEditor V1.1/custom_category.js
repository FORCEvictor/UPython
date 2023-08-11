class CustomCategory extends Blockly.ToolboxCategory {
    constructor(categoryDef, toolbox, opt_parent) {
        super(categoryDef, toolbox, opt_parent);
    }

    addColourBorder_(colour) {
        this.rowDiv_.style.backgroundColor = colour;
    }

    setSelected(isSelected) {
        var labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
        if (isSelected) {
            this.rowDiv_.style.backgroundColor = 'white';
            this.rowDiv_.style.boxShadow = "0px 0px 0px  2.5px " + this.colour_ + " inset";
            labelDom.style.color = this.colour_;
            this.iconDom_.style.color = this.colour_;
        } else {
            this.rowDiv_.style.backgroundColor = this.colour_;
            labelDom.style.color = 'white';
            this.iconDom_.style.color = 'white';
        }
        Blockly.utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
            Blockly.utils.aria.State.SELECTED, isSelected);
    }
}

Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    CustomCategory, true);

    
    