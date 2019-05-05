import * as $protobuf from "protobufjs";
/** Properties of a Field. */
export interface IField {

    /** Field key */
    key?: (string|null);

    /** Field label */
    label?: (string|null);

    /** Field type */
    type?: (Field.Type|null);

    /** Field value */
    value?: (string|null);
}

/** Represents a Field. */
export class Field implements IField {

    /**
     * Constructs a new Field.
     * @param [properties] Properties to set
     */
    constructor(properties?: IField);

    /** Field key. */
    public key: string;

    /** Field label. */
    public label: string;

    /** Field type. */
    public type: Field.Type;

    /** Field value. */
    public value: string;

    /**
     * Creates a new Field instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Field instance
     */
    public static create(properties?: IField): Field;

    /**
     * Encodes the specified Field message. Does not implicitly {@link Field.verify|verify} messages.
     * @param message Field message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IField, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Field message, length delimited. Does not implicitly {@link Field.verify|verify} messages.
     * @param message Field message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IField, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Field message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Field
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Field;

    /**
     * Decodes a Field message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Field
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Field;

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
    public static fromObject(object: { [k: string]: any }): Field;

    /**
     * Creates a plain object from a Field message. Also converts values to other types if specified.
     * @param message Field
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Field, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Field to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Field {

    /** Type enum. */
    enum Type {
        Text = 0,
        Image = 1,
        File = 2,
        Number = 3,
        Boolean = 4
    }
}

/** Properties of a UTXO. */
export interface IUTXO {

    /** UTXO txId */
    txId?: (string|null);

    /** UTXO vout */
    vout?: (number|null);

    /** UTXO script */
    script?: (string|null);

    /** UTXO satoshis */
    satoshis?: (number|null);
}

/** Represents a UTXO. */
export class UTXO implements IUTXO {

    /**
     * Constructs a new UTXO.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUTXO);

    /** UTXO txId. */
    public txId: string;

    /** UTXO vout. */
    public vout: number;

    /** UTXO script. */
    public script: string;

    /** UTXO satoshis. */
    public satoshis: number;

    /**
     * Creates a new UTXO instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UTXO instance
     */
    public static create(properties?: IUTXO): UTXO;

    /**
     * Encodes the specified UTXO message. Does not implicitly {@link UTXO.verify|verify} messages.
     * @param message UTXO message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUTXO, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified UTXO message, length delimited. Does not implicitly {@link UTXO.verify|verify} messages.
     * @param message UTXO message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUTXO, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a UTXO message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UTXO
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UTXO;

    /**
     * Decodes a UTXO message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UTXO
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UTXO;

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
    public static fromObject(object: { [k: string]: any }): UTXO;

    /**
     * Creates a plain object from a UTXO message. Also converts values to other types if specified.
     * @param message UTXO
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: UTXO, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this UTXO to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Stage. */
export interface IStage {

    /** Stage name */
    name?: (string|null);

    /** Stage schema */
    schema?: (Stage.ISchema|null);

    /** Stage funds */
    funds?: (number|null);

    /** Stage payee */
    payee?: (string|null);

    /** Stage validationScriptTxn */
    validationScriptTxn?: (string|null);

    /** Stage onComplete */
    onComplete?: (Stage.IHandler|null);
}

/** Represents a Stage. */
export class Stage implements IStage {

    /**
     * Constructs a new Stage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IStage);

    /** Stage name. */
    public name: string;

    /** Stage schema. */
    public schema?: (Stage.ISchema|null);

    /** Stage funds. */
    public funds: number;

    /** Stage payee. */
    public payee: string;

    /** Stage validationScriptTxn. */
    public validationScriptTxn: string;

    /** Stage onComplete. */
    public onComplete?: (Stage.IHandler|null);

    /**
     * Creates a new Stage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Stage instance
     */
    public static create(properties?: IStage): Stage;

    /**
     * Encodes the specified Stage message. Does not implicitly {@link Stage.verify|verify} messages.
     * @param message Stage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IStage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Stage message, length delimited. Does not implicitly {@link Stage.verify|verify} messages.
     * @param message Stage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IStage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Stage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Stage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Stage;

    /**
     * Decodes a Stage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Stage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Stage;

    /**
     * Verifies a Stage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Stage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Stage
     */
    public static fromObject(object: { [k: string]: any }): Stage;

    /**
     * Creates a plain object from a Stage message. Also converts values to other types if specified.
     * @param message Stage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Stage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Stage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Stage {

    /** Properties of a Schema. */
    interface ISchema {

        /** Schema txid */
        txid?: (string|null);

        /** Schema name */
        name?: (string|null);

        /** Schema fields */
        fields?: (IField[]|null);
    }

    /** Represents a Schema. */
    class Schema implements ISchema {

        /**
         * Constructs a new Schema.
         * @param [properties] Properties to set
         */
        constructor(properties?: Stage.ISchema);

        /** Schema txid. */
        public txid: string;

        /** Schema name. */
        public name: string;

        /** Schema fields. */
        public fields: IField[];

        /**
         * Creates a new Schema instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Schema instance
         */
        public static create(properties?: Stage.ISchema): Stage.Schema;

        /**
         * Encodes the specified Schema message. Does not implicitly {@link Stage.Schema.verify|verify} messages.
         * @param message Schema message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Stage.ISchema, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Schema message, length delimited. Does not implicitly {@link Stage.Schema.verify|verify} messages.
         * @param message Schema message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Stage.ISchema, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Schema message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Schema
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Stage.Schema;

        /**
         * Decodes a Schema message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Schema
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Stage.Schema;

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
        public static fromObject(object: { [k: string]: any }): Stage.Schema;

        /**
         * Creates a plain object from a Schema message. Also converts values to other types if specified.
         * @param message Schema
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Stage.Schema, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Schema to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Handler. */
    interface IHandler {

        /** Handler processScriptTxn */
        processScriptTxn?: (string|null);

        /** Handler createTaskStageIdx */
        createTaskStageIdx?: (number|null);

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
        constructor(properties?: Stage.IHandler);

        /** Handler processScriptTxn. */
        public processScriptTxn: string;

        /** Handler createTaskStageIdx. */
        public createTaskStageIdx: number;

        /** Handler assignee. */
        public assignee: string;

        /** Handler funds. */
        public funds: number;

        /**
         * Creates a new Handler instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Handler instance
         */
        public static create(properties?: Stage.IHandler): Stage.Handler;

        /**
         * Encodes the specified Handler message. Does not implicitly {@link Stage.Handler.verify|verify} messages.
         * @param message Handler message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Stage.IHandler, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Handler message, length delimited. Does not implicitly {@link Stage.Handler.verify|verify} messages.
         * @param message Handler message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Stage.IHandler, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Handler message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Handler
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Stage.Handler;

        /**
         * Decodes a Handler message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Handler
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Stage.Handler;

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
        public static fromObject(object: { [k: string]: any }): Stage.Handler;

        /**
         * Creates a plain object from a Handler message. Also converts values to other types if specified.
         * @param message Handler
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Stage.Handler, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Handler to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Properties of a Workflow. */
export interface IWorkflow {

    /** Workflow name */
    name?: (string|null);

    /** Workflow txid */
    txid?: (string|null);

    /** Workflow owner */
    owner?: (string|null);

    /** Workflow stages */
    stages?: (IStage[]|null);
}

/** Represents a Workflow. */
export class Workflow implements IWorkflow {

    /**
     * Constructs a new Workflow.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWorkflow);

    /** Workflow name. */
    public name: string;

    /** Workflow txid. */
    public txid: string;

    /** Workflow owner. */
    public owner: string;

    /** Workflow stages. */
    public stages: IStage[];

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

/** Properties of a State. */
export interface IState {

    /** State txid */
    txid?: (string|null);

    /** State workflow */
    workflow?: (IWorkflow|null);

    /** State status */
    status?: (State.Status|null);

    /** State values */
    values?: (IField[]|null);

    /** State tasks */
    tasks?: (State.ITask[]|null);
}

/** Represents a State. */
export class State implements IState {

    /**
     * Constructs a new State.
     * @param [properties] Properties to set
     */
    constructor(properties?: IState);

    /** State txid. */
    public txid: string;

    /** State workflow. */
    public workflow?: (IWorkflow|null);

    /** State status. */
    public status: State.Status;

    /** State values. */
    public values: IField[];

    /** State tasks. */
    public tasks: State.ITask[];

    /**
     * Creates a new State instance using the specified properties.
     * @param [properties] Properties to set
     * @returns State instance
     */
    public static create(properties?: IState): State;

    /**
     * Encodes the specified State message. Does not implicitly {@link State.verify|verify} messages.
     * @param message State message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IState, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified State message, length delimited. Does not implicitly {@link State.verify|verify} messages.
     * @param message State message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IState, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a State message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns State
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): State;

    /**
     * Decodes a State message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns State
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): State;

    /**
     * Verifies a State message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a State message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns State
     */
    public static fromObject(object: { [k: string]: any }): State;

    /**
     * Creates a plain object from a State message. Also converts values to other types if specified.
     * @param message State
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: State, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this State to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace State {

    /** Status enum. */
    enum Status {
        Open = 0,
        Error = 1,
        Complete = 2
    }

    /** Properties of a Task. */
    interface ITask {

        /** Task stage */
        stage?: (IStage|null);

        /** Task status */
        status?: (State.Status|null);

        /** Task address */
        address?: (string|null);

        /** Task utxos */
        utxos?: (IUTXO[]|null);

        /** Task txid */
        txid?: (string|null);
    }

    /** Represents a Task. */
    class Task implements ITask {

        /**
         * Constructs a new Task.
         * @param [properties] Properties to set
         */
        constructor(properties?: State.ITask);

        /** Task stage. */
        public stage?: (IStage|null);

        /** Task status. */
        public status: State.Status;

        /** Task address. */
        public address: string;

        /** Task utxos. */
        public utxos: IUTXO[];

        /** Task txid. */
        public txid: string;

        /**
         * Creates a new Task instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Task instance
         */
        public static create(properties?: State.ITask): State.Task;

        /**
         * Encodes the specified Task message. Does not implicitly {@link State.Task.verify|verify} messages.
         * @param message Task message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: State.ITask, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Task message, length delimited. Does not implicitly {@link State.Task.verify|verify} messages.
         * @param message Task message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: State.ITask, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Task message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Task
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): State.Task;

        /**
         * Decodes a Task message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Task
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): State.Task;

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
        public static fromObject(object: { [k: string]: any }): State.Task;

        /**
         * Creates a plain object from a Task message. Also converts values to other types if specified.
         * @param message Task
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: State.Task, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Task to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
