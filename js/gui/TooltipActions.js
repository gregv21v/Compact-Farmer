/**
 * TooltipActions - the actions that a tooltip can perform
 */

/**
 * Fields
 * {string} html
 * {x, y} position
 * {number} width
 * {number} height
 * {boolean} hidden;
 */
export default class TooltipActions {
    hide(data) {
        return {
            ...data, hidden: true
        }
    }

    show(data) {
        return {
            ...data, hidden: false
        }
    }
}