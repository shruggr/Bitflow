import * as $protobuf from "protobufjs";
/** Properties of a Schema. */
export interface ISchema {

    /** Schema id */
    id?: (string|null);

    /** Schema name */
    name?: (string|null);

    /** Schema fields */
    fields?: (Schema.IField[]|null);
}

/** Represents a Schema. */
export class Schema implements ISchema {

    /**
     * Constructs a new Schema.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISchema);

    /** Schema id. */
    public id: string;

    /** Schema name. */
    public name: string;

    /** Schema fields. */
    public fields: Schema.IField[];

    /**
     * Creates a new Schema instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Schema instance
     */
    public static create(properties?: ISchema): Schema;

    /**
     * Encodes the specified Schema message. Does not implicitly {@link Schema.verify|verify} messages.
     * @param message Schema message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISchema, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Schema message, length delimited. Does not implicitly {@link Schema.verify|verify} messages.
     * @param message Schema message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISchema, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Schema message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Schema
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Schema;

    /**
     * Decodes a Schema message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Schema
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Schema;

    /**
     * Verifies a Schema message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Schema message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Schema
     */
    public static fromObject(object: { [k: string]: any }): Schema;

    /**
     * Creates a plain object from a Schema message. Also converts values to other types if specified.
     * @param message Schema
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Schema, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Schema to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Schema {

    /** Type enum. */
    enum Type {
        Text = 0,
        Image = 1,
        File = 2,
        Number = 3
    }

    /** Properties of a Field. */
    interface IField {

        /** Field key */
        key?: (string|null);

        /** Field label */
        label?: (string|null);

        /** Field type */
        type?: (Schema.Type|null);
    }

    /** Represents a Field. */
    class Field implements IField {

        /**
         * Constructs a new Field.
         * @param [properties] Properties to set
         */
        constructor(properties?: Schema.IField);

        /** Field key. */
        public key: string;

        /** Field label. */
        public label: string;

        /** Field type. */
        public type: Schema.Type;

        /**
         * Creates a new Field instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Field instance
         */
        public static create(properties?: Schema.IField): Schema.Field;

        /**
         * Encodes the specified Field message. Does not implicitly {@link Schema.Field.verify|verify} messages.
         * @param message Field message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Schema.IField, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Field message, length delimited. Does not implicitly {@link Schema.Field.verify|verify} messages.
         * @param message Field message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Schema.IField, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Field message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Field
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Schema.Field;

        /**
         * Decodes a Field message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Field
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Schema.Field;

        /**
         * Verifies a Field message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Field message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Field
         */
        public static fromObject(object: { [k: string]: any }): Schema.Field;

        /**
         * Creates a plain object from a Field message. Also converts values to other types if specified.
         * @param message Field
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Schema.Field, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Field to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Properties of a Step. */
export interface IStep {

    /** Step name */
    name?: (string|null);

    /** Step schemaTxn */
    schemaTxn?: (string|null);

    /** Step fundsRequired */
    fundsRequired?: (number|null);

    /** Step payee */
    payee?: (string|null);

    /** Step validationScriptTxn */
    validationScriptTxn?: (string|null);

    /** Step onComplete */
    onComplete?: (Step.IHandler[]|null);
}

/** Represents a Step. */
export class Step implements IStep {

    /**
     * Constructs a new Step.
     * @param [properties] Properties to set
     */
    constructor(properties?: IStep);

    /** Step name. */
    public name: string;

    /** Step schemaTxn. */
    public schemaTxn: string;

    /** Step fundsRequired. */
    public fundsRequired: number;

    /** Step payee. */
    public payee: string;

    /** Step validationScriptTxn. */
    public validationScriptTxn: string;

    /** Step onComplete. */
    public onComplete: Step.IHandler[];

    /**
     * Creates a new Step instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Step instance
     */
    public static create(properties?: IStep): Step;

    /**
     * Encodes the specified Step message. Does not implicitly {@link Step.verify|verify} messages.
     * @param message Step message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IStep, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Step message, length delimited. Does not implicitly {@link Step.verify|verify} messages.
     * @param message Step message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IStep, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Step message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Step
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Step;

    /**
     * Decodes a Step message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Step
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Step;

    /**
     * Verifies a Step message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Step message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Step
     */
    public static fromObject(object: { [k: string]: any }): Step;

    /**
     * Creates a plain object from a Step message. Also converts values to other types if specified.
     * @param message Step
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Step, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Step to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Step {

    /** Properties of a Handler. */
    interface IHandler {

        /** Handler processScriptTxn */
        processScriptTxn?: (string|null);

        /** Handler createTaskStepIdx */
        createTaskStepIdx?: (number|null);

        /** Handler assignee */
        assignee?: (string|null);

        /** Handler funds */
        funds?: (number|null);
    }

    /** Represents a Handler. */
    class Handler implements IHandler {

        /**
         * Constructs a new Handler.
         * @param [properties] Properties to set
         */
        constructor(properties?: Step.IHandler);

        /** Handler processScriptTxn. */
        public processScriptTxn: string;

        /** Handler createTaskStepIdx. */
        public createTaskStepIdx: number;

        /** Handler assignee. */
        public assignee: string;

        /** Handler funds. */
        public funds: number;

        /**
         * Creates a new Handler instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Handler instance
         */
        public static create(properties?: Step.IHandler): Step.Handler;

        /**
         * Encodes the specified Handler message. Does not implicitly {@link Step.Handler.verify|verify} messages.
         * @param message Handler message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Step.IHandler, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Handler message, length delimited. Does not implicitly {@link Step.Handler.verify|verify} messages.
         * @param message Handler message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Step.IHandler, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Handler message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Handler
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Step.Handler;

        /**
         * Decodes a Handler message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Handler
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Step.Handler;

        /**
         * Verifies a Handler message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Handler message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Handler
         */
        public static fromObject(object: { [k: string]: any }): Step.Handler;

        /**
         * Creates a plain object from a Handler message. Also converts values to other types if specified.
         * @param message Handler
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Step.Handler, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Handler to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Properties of a Workflow. */
export interface IWorkflow {

    /** Workflow id */
    id?: (string|null);

    /** Workflow owner */
    owner?: (string|null);

    /** Workflow steps */
    steps?: (IStep[]|null);
}

/** Represents a Workflow. */
export class Workflow implements IWorkflow {

    /**
     * Constructs a new Workflow.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWorkflow);

    /** Workflow id. */
    public id: string;

    /** Workflow owner. */
    public owner: string;

    /** Workflow steps. */
    public steps: IStep[];

    /**
     * Creates a new Workflow instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Workflow instance
     */
    public static create(properties?: IWorkflow): Workflow;

    /**
     * Encodes the specified Workflow message. Does not implicitly {@link Workflow.verify|verify} messages.
     * @param message Workflow message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IWorkflow, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Workflow message, length delimited. Does not implicitly {@link Workflow.verify|verify} messages.
     * @param message Workflow message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IWorkflow, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Workflow message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Workflow
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Workflow;

    /**
     * Decodes a Workflow message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Workflow
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Workflow;

    /**
     * Verifies a Workflow message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Workflow message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Workflow
     */
    public static fromObject(object: { [k: string]: any }): Workflow;

    /**
     * Creates a plain object from a Workflow message. Also converts values to other types if specified.
     * @param message Workflow
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Workflow, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Workflow to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a WorkflowState. */
export interface IWorkflowState {

    /** WorkflowState id */
    id?: (string|null);

    /** WorkflowState workflowTxn */
    workflowTxn?: (string|null);

    /** WorkflowState status */
    status?: (WorkflowState.Status|null);

    /** WorkflowState state */
    state?: (string|null);

    /** WorkflowState tasks */
    tasks?: (WorkflowState.ITask[]|null);
}

/** Represents a WorkflowState. */
export class WorkflowState implements IWorkflowState {

    /**
     * Constructs a new WorkflowState.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWorkflowState);

    /** WorkflowState id. */
    public id: string;

    /** WorkflowState workflowTxn. */
    public workflowTxn: string;

    /** WorkflowState status. */
    public status: WorkflowState.Status;

    /** WorkflowState state. */
    public state: string;

    /** WorkflowState tasks. */
    public tasks: WorkflowState.ITask[];

    /**
     * Creates a new WorkflowState instance using the specified properties.
     * @param [properties] Properties to set
     * @returns WorkflowState instance
     */
    public static create(properties?: IWorkflowState): WorkflowState;

    /**
     * Encodes the specified WorkflowState message. Does not implicitly {@link WorkflowState.verify|verify} messages.
     * @param message WorkflowState message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IWorkflowState, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified WorkflowState message, length delimited. Does not implicitly {@link WorkflowState.verify|verify} messages.
     * @param message WorkflowState message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IWorkflowState, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a WorkflowState message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns WorkflowState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WorkflowState;

    /**
     * Decodes a WorkflowState message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns WorkflowState
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WorkflowState;

    /**
     * Verifies a WorkflowState message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a WorkflowState message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns WorkflowState
     */
    public static fromObject(object: { [k: string]: any }): WorkflowState;

    /**
     * Creates a plain object from a WorkflowState message. Also converts values to other types if specified.
     * @param message WorkflowState
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: WorkflowState, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this WorkflowState to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace WorkflowState {

    /** Status enum. */
    enum Status {
        Open = 0,
        Error = 1,
        Complete = 2
    }

    /** Properties of a UTXO. */
    interface IUTXO {

        /** UTXO txId */
        txId?: (string|null);

        /** UTXO vout */
        vout?: (number|null);

        /** UTXO address */
        address?: (string|null);

        /** UTXO script */
        script?: (string|null);

        /** UTXO satoshis */
        satoshis?: (number|null);
    }

    /** Represents a UTXO. */
    class UTXO implements IUTXO {

        /**
         * Constructs a new UTXO.
         * @param [properties] Properties to set
         */
        constructor(properties?: WorkflowState.IUTXO);

        /** UTXO txId. */
        public txId: string;

        /** UTXO vout. */
        public vout: number;

        /** UTXO address. */
        public address: string;

        /** UTXO script. */
        public script: string;

        /** UTXO satoshis. */
        public satoshis: number;

        /**
         * Creates a new UTXO instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UTXO instance
         */
        public static create(properties?: WorkflowState.IUTXO): WorkflowState.UTXO;

        /**
         * Encodes the specified UTXO message. Does not implicitly {@link WorkflowState.UTXO.verify|verify} messages.
         * @param message UTXO message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: WorkflowState.IUTXO, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UTXO message, length delimited. Does not implicitly {@link WorkflowState.UTXO.verify|verify} messages.
         * @param message UTXO message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: WorkflowState.IUTXO, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UTXO message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UTXO
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WorkflowState.UTXO;

        /**
         * Decodes a UTXO message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UTXO
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WorkflowState.UTXO;

        /**
         * Verifies a UTXO message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UTXO message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UTXO
         */
        public static fromObject(object: { [k: string]: any }): WorkflowState.UTXO;

        /**
         * Creates a plain object from a UTXO message. Also converts values to other types if specified.
         * @param message UTXO
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: WorkflowState.UTXO, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UTXO to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Task. */
    interface ITask {

        /** Task step */
        step?: (IStep|null);

        /** Task status */
        status?: (WorkflowState.Status|null);

        /** Task utxo */
        utxo?: (WorkflowState.IUTXO|null);
    }

    /** Represents a Task. */
    class Task implements ITask {

        /**
         * Constructs a new Task.
         * @param [properties] Properties to set
         */
        constructor(properties?: WorkflowState.ITask);

        /** Task step. */
        public step?: (IStep|null);

        /** Task status. */
        public status: WorkflowState.Status;

        /** Task utxo. */
        public utxo?: (WorkflowState.IUTXO|null);

        /**
         * Creates a new Task instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Task instance
         */
        public static create(properties?: WorkflowState.ITask): WorkflowState.Task;

        /**
         * Encodes the specified Task message. Does not implicitly {@link WorkflowState.Task.verify|verify} messages.
         * @param message Task message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: WorkflowState.ITask, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Task message, length delimited. Does not implicitly {@link WorkflowState.Task.verify|verify} messages.
         * @param message Task message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: WorkflowState.ITask, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Task message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Task
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WorkflowState.Task;

        /**
         * Decodes a Task message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Task
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WorkflowState.Task;

        /**
         * Verifies a Task message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Task message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Task
         */
        public static fromObject(object: { [k: string]: any }): WorkflowState.Task;

        /**
         * Creates a plain object from a Task message. Also converts values to other types if specified.
         * @param message Task
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: WorkflowState.Task, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Task to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
