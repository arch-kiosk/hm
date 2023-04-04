import {unsafeCSS, LitElement, TemplateResult, PropertyValues, nothing} from "lit";
import { html } from 'lit/static-html.js'
import { customElement, property, state } from "lit/decorators.js";

// import local_css from "/src/static/logviewerapp.sass?inline";
// @ts-ignore
import local_css from "./styles/hm-component.sass?inline";

@customElement("hm-component")
export class HMComponent extends LitElement {
    static styles = unsafeCSS(local_css);
    _messages: { [key: string]: object } = {};
    _dsd_to_element_list: {[key: string]: UISchemaUIElementWithId} = {}
    _element_list: {[key: string]: UISchemaUIElement} = {}
    _selection_data: {[key: string]: {[key: string]: string}} = {}

    // @property()
    // uiSchema: UISchema | null = null

    // @state()
    // _showError: string | null = null

    constructor() {
        super();
        this._messages = {}
        // this.addEventListener('click', (e) => console.log(e), {capture: true});
    }

    protected willUpdate(_changedProperties: PropertyValues) {
        // super.willUpdate(_changedProperties);
        // if (_changedProperties.has("uiSchema")) {
        //     this.processSchemaDefinition()
        // }
    }

    firstUpdated(_changedProperties: any) {
        super.firstUpdated(_changedProperties);

    }

    updated(_changedProperties: any) {
        super.updated(_changedProperties);
    }

    render() {
        return html`<h1>hm component</h1>`
    }
}
