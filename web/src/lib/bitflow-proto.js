/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Schema = (function() {

    /**
     * Properties of a Schema.
     * @exports ISchema
     * @interface ISchema
     * @property {string|null} [id] Schema id
     * @property {string|null} [name] Schema name
     * @property {Array.<Schema.IField>|null} [fields] Schema fields
     */

    /**
     * Constructs a new Schema.
     * @exports Schema
     * @classdesc Represents a Schema.
     * @implements ISchema
     * @constructor
     * @param {ISchema=} [properties] Properties to set
     */
    function Schema(properties) {
        this.fields = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Schema id.
     * @member {string} id
     * @memberof Schema
     * @instance
     */
    Schema.prototype.id = "";

    /**
     * Schema name.
     * @member {string} name
     * @memberof Schema
     * @instance
     */
    Schema.prototype.name = "";

    /**
     * Schema fields.
     * @member {Array.<Schema.IField>} fields
     * @memberof Schema
     * @instance
     */
    Schema.prototype.fields = $util.emptyArray;

    /**
     * Creates a new Schema instance using the specified properties.
     * @function create
     * @memberof Schema
     * @static
     * @param {ISchema=} [properties] Properties to set
     * @returns {Schema} Schema instance
     */
    Schema.create = function create(properties) {
        return new Schema(properties);
    };

    /**
     * Encodes the specified Schema message. Does not implicitly {@link Schema.verify|verify} messages.
     * @function encode
     * @memberof Schema
     * @static
     * @param {ISchema} message Schema message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Schema.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
        if (message.fields != null && message.fields.length)
            for (var i = 0; i < message.fields.length; ++i)
                $root.Schema.Field.encode(message.fields[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Schema message, length delimited. Does not implicitly {@link Schema.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Schema
     * @static
     * @param {ISchema} message Schema message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Schema.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Schema message from the specified reader or buffer.
     * @function decode
     * @memberof Schema
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Schema} Schema
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Schema.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Schema();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.name = reader.string();
                break;
            case 3:
                if (!(message.fields && message.fields.length))
                    message.fields = [];
                message.fields.push($root.Schema.Field.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Schema message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Schema
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Schema} Schema
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Schema.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Schema message.
     * @function verify
     * @memberof Schema
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Schema.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.fields != null && message.hasOwnProperty("fields")) {
            if (!Array.isArray(message.fields))
                return "fields: array expected";
            for (var i = 0; i < message.fields.length; ++i) {
                var error = $root.Schema.Field.verify(message.fields[i]);
                if (error)
                    return "fields." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Schema message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Schema
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Schema} Schema
     */
    Schema.fromObject = function fromObject(object) {
        if (object instanceof $root.Schema)
            return object;
        var message = new $root.Schema();
        if (object.id != null)
            message.id = String(object.id);
        if (object.name != null)
            message.name = String(object.name);
        if (object.fields) {
            if (!Array.isArray(object.fields))
                throw TypeError(".Schema.fields: array expected");
            message.fields = [];
            for (var i = 0; i < object.fields.length; ++i) {
                if (typeof object.fields[i] !== "object")
                    throw TypeError(".Schema.fields: object expected");
                message.fields[i] = $root.Schema.Field.fromObject(object.fields[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Schema message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Schema
     * @static
     * @param {Schema} message Schema
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Schema.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.fields = [];
        if (options.defaults) {
            object.id = "";
            object.name = "";
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.fields && message.fields.length) {
            object.fields = [];
            for (var j = 0; j < message.fields.length; ++j)
                object.fields[j] = $root.Schema.Field.toObject(message.fields[j], options);
        }
        return object;
    };

    /**
     * Converts this Schema to JSON.
     * @function toJSON
     * @memberof Schema
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Schema.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Type enum.
     * @name Schema.Type
     * @enum {string}
     * @property {number} Text=0 Text value
     * @property {number} Image=1 Image value
     * @property {number} File=2 File value
     * @property {number} Number=3 Number value
     */
    Schema.Type = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Text"] = 0;
        values[valuesById[1] = "Image"] = 1;
        values[valuesById[2] = "File"] = 2;
        values[valuesById[3] = "Number"] = 3;
        return values;
    })();

    Schema.Field = (function() {

        /**
         * Properties of a Field.
         * @memberof Schema
         * @interface IField
         * @property {string|null} [key] Field key
         * @property {string|null} [label] Field label
         * @property {Schema.Type|null} [type] Field type
         */

        /**
         * Constructs a new Field.
         * @memberof Schema
         * @classdesc Represents a Field.
         * @implements IField
         * @constructor
         * @param {Schema.IField=} [properties] Properties to set
         */
        function Field(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Field key.
         * @member {string} key
         * @memberof Schema.Field
         * @instance
         */
        Field.prototype.key = "";

        /**
         * Field label.
         * @member {string} label
         * @memberof Schema.Field
         * @instance
         */
        Field.prototype.label = "";

        /**
         * Field type.
         * @member {Schema.Type} type
         * @memberof Schema.Field
         * @instance
         */
        Field.prototype.type = 0;

        /**
         * Creates a new Field instance using the specified properties.
         * @function create
         * @memberof Schema.Field
         * @static
         * @param {Schema.IField=} [properties] Properties to set
         * @returns {Schema.Field} Field instance
         */
        Field.create = function create(properties) {
            return new Field(properties);
        };

        /**
         * Encodes the specified Field message. Does not implicitly {@link Schema.Field.verify|verify} messages.
         * @function encode
         * @memberof Schema.Field
         * @static
         * @param {Schema.IField} message Field message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Field.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && message.hasOwnProperty("key"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
            if (message.label != null && message.hasOwnProperty("label"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.label);
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified Field message, length delimited. Does not implicitly {@link Schema.Field.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Schema.Field
         * @static
         * @param {Schema.IField} message Field message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Field.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Field message from the specified reader or buffer.
         * @function decode
         * @memberof Schema.Field
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Schema.Field} Field
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Field.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Schema.Field();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.label = reader.string();
                    break;
                case 3:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Field message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Schema.Field
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Schema.Field} Field
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Field.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Field message.
         * @function verify
         * @memberof Schema.Field
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Field.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!$util.isString(message.key))
                    return "key: string expected";
            if (message.label != null && message.hasOwnProperty("label"))
                if (!$util.isString(message.label))
                    return "label: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates a Field message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Schema.Field
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Schema.Field} Field
         */
        Field.fromObject = function fromObject(object) {
            if (object instanceof $root.Schema.Field)
                return object;
            var message = new $root.Schema.Field();
            if (object.key != null)
                message.key = String(object.key);
            if (object.label != null)
                message.label = String(object.label);
            switch (object.type) {
            case "Text":
            case 0:
                message.type = 0;
                break;
            case "Image":
            case 1:
                message.type = 1;
                break;
            case "File":
            case 2:
                message.type = 2;
                break;
            case "Number":
            case 3:
                message.type = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Field message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Schema.Field
         * @static
         * @param {Schema.Field} message Field
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Field.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.key = "";
                object.label = "";
                object.type = options.enums === String ? "Text" : 0;
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = message.key;
            if (message.label != null && message.hasOwnProperty("label"))
                object.label = message.label;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.Schema.Type[message.type] : message.type;
            return object;
        };

        /**
         * Converts this Field to JSON.
         * @function toJSON
         * @memberof Schema.Field
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Field.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Field;
    })();

    return Schema;
})();

$root.UTXO = (function() {

    /**
     * Properties of a UTXO.
     * @exports IUTXO
     * @interface IUTXO
     * @property {string|null} [txId] UTXO txId
     * @property {number|null} [vout] UTXO vout
     * @property {string|null} [script] UTXO script
     * @property {number|null} [satoshis] UTXO satoshis
     */

    /**
     * Constructs a new UTXO.
     * @exports UTXO
     * @classdesc Represents a UTXO.
     * @implements IUTXO
     * @constructor
     * @param {IUTXO=} [properties] Properties to set
     */
    function UTXO(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UTXO txId.
     * @member {string} txId
     * @memberof UTXO
     * @instance
     */
    UTXO.prototype.txId = "";

    /**
     * UTXO vout.
     * @member {number} vout
     * @memberof UTXO
     * @instance
     */
    UTXO.prototype.vout = 0;

    /**
     * UTXO script.
     * @member {string} script
     * @memberof UTXO
     * @instance
     */
    UTXO.prototype.script = "";

    /**
     * UTXO satoshis.
     * @member {number} satoshis
     * @memberof UTXO
     * @instance
     */
    UTXO.prototype.satoshis = 0;

    /**
     * Creates a new UTXO instance using the specified properties.
     * @function create
     * @memberof UTXO
     * @static
     * @param {IUTXO=} [properties] Properties to set
     * @returns {UTXO} UTXO instance
     */
    UTXO.create = function create(properties) {
        return new UTXO(properties);
    };

    /**
     * Encodes the specified UTXO message. Does not implicitly {@link UTXO.verify|verify} messages.
     * @function encode
     * @memberof UTXO
     * @static
     * @param {IUTXO} message UTXO message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UTXO.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.txId != null && message.hasOwnProperty("txId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.txId);
        if (message.vout != null && message.hasOwnProperty("vout"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.vout);
        if (message.script != null && message.hasOwnProperty("script"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.script);
        if (message.satoshis != null && message.hasOwnProperty("satoshis"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.satoshis);
        return writer;
    };

    /**
     * Encodes the specified UTXO message, length delimited. Does not implicitly {@link UTXO.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UTXO
     * @static
     * @param {IUTXO} message UTXO message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UTXO.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a UTXO message from the specified reader or buffer.
     * @function decode
     * @memberof UTXO
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UTXO} UTXO
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UTXO.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.UTXO();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.txId = reader.string();
                break;
            case 2:
                message.vout = reader.int32();
                break;
            case 4:
                message.script = reader.string();
                break;
            case 5:
                message.satoshis = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a UTXO message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UTXO
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UTXO} UTXO
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UTXO.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a UTXO message.
     * @function verify
     * @memberof UTXO
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UTXO.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.txId != null && message.hasOwnProperty("txId"))
            if (!$util.isString(message.txId))
                return "txId: string expected";
        if (message.vout != null && message.hasOwnProperty("vout"))
            if (!$util.isInteger(message.vout))
                return "vout: integer expected";
        if (message.script != null && message.hasOwnProperty("script"))
            if (!$util.isString(message.script))
                return "script: string expected";
        if (message.satoshis != null && message.hasOwnProperty("satoshis"))
            if (!$util.isInteger(message.satoshis))
                return "satoshis: integer expected";
        return null;
    };

    /**
     * Creates a UTXO message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UTXO
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UTXO} UTXO
     */
    UTXO.fromObject = function fromObject(object) {
        if (object instanceof $root.UTXO)
            return object;
        var message = new $root.UTXO();
        if (object.txId != null)
            message.txId = String(object.txId);
        if (object.vout != null)
            message.vout = object.vout | 0;
        if (object.script != null)
            message.script = String(object.script);
        if (object.satoshis != null)
            message.satoshis = object.satoshis | 0;
        return message;
    };

    /**
     * Creates a plain object from a UTXO message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UTXO
     * @static
     * @param {UTXO} message UTXO
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UTXO.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.txId = "";
            object.vout = 0;
            object.script = "";
            object.satoshis = 0;
        }
        if (message.txId != null && message.hasOwnProperty("txId"))
            object.txId = message.txId;
        if (message.vout != null && message.hasOwnProperty("vout"))
            object.vout = message.vout;
        if (message.script != null && message.hasOwnProperty("script"))
            object.script = message.script;
        if (message.satoshis != null && message.hasOwnProperty("satoshis"))
            object.satoshis = message.satoshis;
        return object;
    };

    /**
     * Converts this UTXO to JSON.
     * @function toJSON
     * @memberof UTXO
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UTXO.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UTXO;
})();

$root.Stage = (function() {

    /**
     * Properties of a Stage.
     * @exports IStage
     * @interface IStage
     * @property {string|null} [name] Stage name
     * @property {string|null} [schemaTxn] Stage schemaTxn
     * @property {number|null} [funds] Stage funds
     * @property {string|null} [payee] Stage payee
     * @property {string|null} [validationScriptTxn] Stage validationScriptTxn
     * @property {Stage.IHandler|null} [onComplete] Stage onComplete
     */

    /**
     * Constructs a new Stage.
     * @exports Stage
     * @classdesc Represents a Stage.
     * @implements IStage
     * @constructor
     * @param {IStage=} [properties] Properties to set
     */
    function Stage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Stage name.
     * @member {string} name
     * @memberof Stage
     * @instance
     */
    Stage.prototype.name = "";

    /**
     * Stage schemaTxn.
     * @member {string} schemaTxn
     * @memberof Stage
     * @instance
     */
    Stage.prototype.schemaTxn = "";

    /**
     * Stage funds.
     * @member {number} funds
     * @memberof Stage
     * @instance
     */
    Stage.prototype.funds = 0;

    /**
     * Stage payee.
     * @member {string} payee
     * @memberof Stage
     * @instance
     */
    Stage.prototype.payee = "";

    /**
     * Stage validationScriptTxn.
     * @member {string} validationScriptTxn
     * @memberof Stage
     * @instance
     */
    Stage.prototype.validationScriptTxn = "";

    /**
     * Stage onComplete.
     * @member {Stage.IHandler|null|undefined} onComplete
     * @memberof Stage
     * @instance
     */
    Stage.prototype.onComplete = null;

    /**
     * Creates a new Stage instance using the specified properties.
     * @function create
     * @memberof Stage
     * @static
     * @param {IStage=} [properties] Properties to set
     * @returns {Stage} Stage instance
     */
    Stage.create = function create(properties) {
        return new Stage(properties);
    };

    /**
     * Encodes the specified Stage message. Does not implicitly {@link Stage.verify|verify} messages.
     * @function encode
     * @memberof Stage
     * @static
     * @param {IStage} message Stage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Stage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.schemaTxn != null && message.hasOwnProperty("schemaTxn"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.schemaTxn);
        if (message.funds != null && message.hasOwnProperty("funds"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.funds);
        if (message.payee != null && message.hasOwnProperty("payee"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.payee);
        if (message.validationScriptTxn != null && message.hasOwnProperty("validationScriptTxn"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.validationScriptTxn);
        if (message.onComplete != null && message.hasOwnProperty("onComplete"))
            $root.Stage.Handler.encode(message.onComplete, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Stage message, length delimited. Does not implicitly {@link Stage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Stage
     * @static
     * @param {IStage} message Stage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Stage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Stage message from the specified reader or buffer.
     * @function decode
     * @memberof Stage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Stage} Stage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Stage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Stage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            case 2:
                message.schemaTxn = reader.string();
                break;
            case 3:
                message.funds = reader.int32();
                break;
            case 4:
                message.payee = reader.string();
                break;
            case 5:
                message.validationScriptTxn = reader.string();
                break;
            case 6:
                message.onComplete = $root.Stage.Handler.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Stage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Stage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Stage} Stage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Stage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Stage message.
     * @function verify
     * @memberof Stage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Stage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.schemaTxn != null && message.hasOwnProperty("schemaTxn"))
            if (!$util.isString(message.schemaTxn))
                return "schemaTxn: string expected";
        if (message.funds != null && message.hasOwnProperty("funds"))
            if (!$util.isInteger(message.funds))
                return "funds: integer expected";
        if (message.payee != null && message.hasOwnProperty("payee"))
            if (!$util.isString(message.payee))
                return "payee: string expected";
        if (message.validationScriptTxn != null && message.hasOwnProperty("validationScriptTxn"))
            if (!$util.isString(message.validationScriptTxn))
                return "validationScriptTxn: string expected";
        if (message.onComplete != null && message.hasOwnProperty("onComplete")) {
            var error = $root.Stage.Handler.verify(message.onComplete);
            if (error)
                return "onComplete." + error;
        }
        return null;
    };

    /**
     * Creates a Stage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Stage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Stage} Stage
     */
    Stage.fromObject = function fromObject(object) {
        if (object instanceof $root.Stage)
            return object;
        var message = new $root.Stage();
        if (object.name != null)
            message.name = String(object.name);
        if (object.schemaTxn != null)
            message.schemaTxn = String(object.schemaTxn);
        if (object.funds != null)
            message.funds = object.funds | 0;
        if (object.payee != null)
            message.payee = String(object.payee);
        if (object.validationScriptTxn != null)
            message.validationScriptTxn = String(object.validationScriptTxn);
        if (object.onComplete != null) {
            if (typeof object.onComplete !== "object")
                throw TypeError(".Stage.onComplete: object expected");
            message.onComplete = $root.Stage.Handler.fromObject(object.onComplete);
        }
        return message;
    };

    /**
     * Creates a plain object from a Stage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Stage
     * @static
     * @param {Stage} message Stage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Stage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.name = "";
            object.schemaTxn = "";
            object.funds = 0;
            object.payee = "";
            object.validationScriptTxn = "";
            object.onComplete = null;
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.schemaTxn != null && message.hasOwnProperty("schemaTxn"))
            object.schemaTxn = message.schemaTxn;
        if (message.funds != null && message.hasOwnProperty("funds"))
            object.funds = message.funds;
        if (message.payee != null && message.hasOwnProperty("payee"))
            object.payee = message.payee;
        if (message.validationScriptTxn != null && message.hasOwnProperty("validationScriptTxn"))
            object.validationScriptTxn = message.validationScriptTxn;
        if (message.onComplete != null && message.hasOwnProperty("onComplete"))
            object.onComplete = $root.Stage.Handler.toObject(message.onComplete, options);
        return object;
    };

    /**
     * Converts this Stage to JSON.
     * @function toJSON
     * @memberof Stage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Stage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    Stage.Handler = (function() {

        /**
         * Properties of a Handler.
         * @memberof Stage
         * @interface IHandler
         * @property {string|null} [processScriptTxn] Handler processScriptTxn
         * @property {number|null} [createTaskStageIdx] Handler createTaskStageIdx
         * @property {string|null} [assignee] Handler assignee
         * @property {number|null} [funds] Handler funds
         */

        /**
         * Constructs a new Handler.
         * @memberof Stage
         * @classdesc Represents a Handler.
         * @implements IHandler
         * @constructor
         * @param {Stage.IHandler=} [properties] Properties to set
         */
        function Handler(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Handler processScriptTxn.
         * @member {string} processScriptTxn
         * @memberof Stage.Handler
         * @instance
         */
        Handler.prototype.processScriptTxn = "";

        /**
         * Handler createTaskStageIdx.
         * @member {number} createTaskStageIdx
         * @memberof Stage.Handler
         * @instance
         */
        Handler.prototype.createTaskStageIdx = 0;

        /**
         * Handler assignee.
         * @member {string} assignee
         * @memberof Stage.Handler
         * @instance
         */
        Handler.prototype.assignee = "";

        /**
         * Handler funds.
         * @member {number} funds
         * @memberof Stage.Handler
         * @instance
         */
        Handler.prototype.funds = 0;

        /**
         * Creates a new Handler instance using the specified properties.
         * @function create
         * @memberof Stage.Handler
         * @static
         * @param {Stage.IHandler=} [properties] Properties to set
         * @returns {Stage.Handler} Handler instance
         */
        Handler.create = function create(properties) {
            return new Handler(properties);
        };

        /**
         * Encodes the specified Handler message. Does not implicitly {@link Stage.Handler.verify|verify} messages.
         * @function encode
         * @memberof Stage.Handler
         * @static
         * @param {Stage.IHandler} message Handler message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Handler.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.processScriptTxn != null && message.hasOwnProperty("processScriptTxn"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.processScriptTxn);
            if (message.createTaskStageIdx != null && message.hasOwnProperty("createTaskStageIdx"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.createTaskStageIdx);
            if (message.assignee != null && message.hasOwnProperty("assignee"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.assignee);
            if (message.funds != null && message.hasOwnProperty("funds"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.funds);
            return writer;
        };

        /**
         * Encodes the specified Handler message, length delimited. Does not implicitly {@link Stage.Handler.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Stage.Handler
         * @static
         * @param {Stage.IHandler} message Handler message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Handler.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Handler message from the specified reader or buffer.
         * @function decode
         * @memberof Stage.Handler
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Stage.Handler} Handler
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Handler.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Stage.Handler();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.processScriptTxn = reader.string();
                    break;
                case 2:
                    message.createTaskStageIdx = reader.int32();
                    break;
                case 3:
                    message.assignee = reader.string();
                    break;
                case 4:
                    message.funds = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Handler message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Stage.Handler
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Stage.Handler} Handler
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Handler.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Handler message.
         * @function verify
         * @memberof Stage.Handler
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Handler.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.processScriptTxn != null && message.hasOwnProperty("processScriptTxn"))
                if (!$util.isString(message.processScriptTxn))
                    return "processScriptTxn: string expected";
            if (message.createTaskStageIdx != null && message.hasOwnProperty("createTaskStageIdx"))
                if (!$util.isInteger(message.createTaskStageIdx))
                    return "createTaskStageIdx: integer expected";
            if (message.assignee != null && message.hasOwnProperty("assignee"))
                if (!$util.isString(message.assignee))
                    return "assignee: string expected";
            if (message.funds != null && message.hasOwnProperty("funds"))
                if (!$util.isInteger(message.funds))
                    return "funds: integer expected";
            return null;
        };

        /**
         * Creates a Handler message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Stage.Handler
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Stage.Handler} Handler
         */
        Handler.fromObject = function fromObject(object) {
            if (object instanceof $root.Stage.Handler)
                return object;
            var message = new $root.Stage.Handler();
            if (object.processScriptTxn != null)
                message.processScriptTxn = String(object.processScriptTxn);
            if (object.createTaskStageIdx != null)
                message.createTaskStageIdx = object.createTaskStageIdx | 0;
            if (object.assignee != null)
                message.assignee = String(object.assignee);
            if (object.funds != null)
                message.funds = object.funds | 0;
            return message;
        };

        /**
         * Creates a plain object from a Handler message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Stage.Handler
         * @static
         * @param {Stage.Handler} message Handler
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Handler.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.processScriptTxn = "";
                object.createTaskStageIdx = 0;
                object.assignee = "";
                object.funds = 0;
            }
            if (message.processScriptTxn != null && message.hasOwnProperty("processScriptTxn"))
                object.processScriptTxn = message.processScriptTxn;
            if (message.createTaskStageIdx != null && message.hasOwnProperty("createTaskStageIdx"))
                object.createTaskStageIdx = message.createTaskStageIdx;
            if (message.assignee != null && message.hasOwnProperty("assignee"))
                object.assignee = message.assignee;
            if (message.funds != null && message.hasOwnProperty("funds"))
                object.funds = message.funds;
            return object;
        };

        /**
         * Converts this Handler to JSON.
         * @function toJSON
         * @memberof Stage.Handler
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Handler.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Handler;
    })();

    return Stage;
})();

$root.Workflow = (function() {

    /**
     * Properties of a Workflow.
     * @exports IWorkflow
     * @interface IWorkflow
     * @property {string|null} [txid] Workflow txid
     * @property {string|null} [owner] Workflow owner
     * @property {Array.<IStage>|null} [stages] Workflow stages
     */

    /**
     * Constructs a new Workflow.
     * @exports Workflow
     * @classdesc Represents a Workflow.
     * @implements IWorkflow
     * @constructor
     * @param {IWorkflow=} [properties] Properties to set
     */
    function Workflow(properties) {
        this.stages = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Workflow txid.
     * @member {string} txid
     * @memberof Workflow
     * @instance
     */
    Workflow.prototype.txid = "";

    /**
     * Workflow owner.
     * @member {string} owner
     * @memberof Workflow
     * @instance
     */
    Workflow.prototype.owner = "";

    /**
     * Workflow stages.
     * @member {Array.<IStage>} stages
     * @memberof Workflow
     * @instance
     */
    Workflow.prototype.stages = $util.emptyArray;

    /**
     * Creates a new Workflow instance using the specified properties.
     * @function create
     * @memberof Workflow
     * @static
     * @param {IWorkflow=} [properties] Properties to set
     * @returns {Workflow} Workflow instance
     */
    Workflow.create = function create(properties) {
        return new Workflow(properties);
    };

    /**
     * Encodes the specified Workflow message. Does not implicitly {@link Workflow.verify|verify} messages.
     * @function encode
     * @memberof Workflow
     * @static
     * @param {IWorkflow} message Workflow message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Workflow.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.txid != null && message.hasOwnProperty("txid"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.txid);
        if (message.owner != null && message.hasOwnProperty("owner"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.owner);
        if (message.stages != null && message.stages.length)
            for (var i = 0; i < message.stages.length; ++i)
                $root.Stage.encode(message.stages[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Workflow message, length delimited. Does not implicitly {@link Workflow.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Workflow
     * @static
     * @param {IWorkflow} message Workflow message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Workflow.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Workflow message from the specified reader or buffer.
     * @function decode
     * @memberof Workflow
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Workflow} Workflow
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Workflow.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.txid = reader.string();
                break;
            case 2:
                message.owner = reader.string();
                break;
            case 3:
                if (!(message.stages && message.stages.length))
                    message.stages = [];
                message.stages.push($root.Stage.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Workflow message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Workflow
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Workflow} Workflow
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Workflow.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Workflow message.
     * @function verify
     * @memberof Workflow
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Workflow.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.txid != null && message.hasOwnProperty("txid"))
            if (!$util.isString(message.txid))
                return "txid: string expected";
        if (message.owner != null && message.hasOwnProperty("owner"))
            if (!$util.isString(message.owner))
                return "owner: string expected";
        if (message.stages != null && message.hasOwnProperty("stages")) {
            if (!Array.isArray(message.stages))
                return "stages: array expected";
            for (var i = 0; i < message.stages.length; ++i) {
                var error = $root.Stage.verify(message.stages[i]);
                if (error)
                    return "stages." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Workflow message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Workflow
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Workflow} Workflow
     */
    Workflow.fromObject = function fromObject(object) {
        if (object instanceof $root.Workflow)
            return object;
        var message = new $root.Workflow();
        if (object.txid != null)
            message.txid = String(object.txid);
        if (object.owner != null)
            message.owner = String(object.owner);
        if (object.stages) {
            if (!Array.isArray(object.stages))
                throw TypeError(".Workflow.stages: array expected");
            message.stages = [];
            for (var i = 0; i < object.stages.length; ++i) {
                if (typeof object.stages[i] !== "object")
                    throw TypeError(".Workflow.stages: object expected");
                message.stages[i] = $root.Stage.fromObject(object.stages[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Workflow message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Workflow
     * @static
     * @param {Workflow} message Workflow
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Workflow.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.stages = [];
        if (options.defaults) {
            object.txid = "";
            object.owner = "";
        }
        if (message.txid != null && message.hasOwnProperty("txid"))
            object.txid = message.txid;
        if (message.owner != null && message.hasOwnProperty("owner"))
            object.owner = message.owner;
        if (message.stages && message.stages.length) {
            object.stages = [];
            for (var j = 0; j < message.stages.length; ++j)
                object.stages[j] = $root.Stage.toObject(message.stages[j], options);
        }
        return object;
    };

    /**
     * Converts this Workflow to JSON.
     * @function toJSON
     * @memberof Workflow
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Workflow.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Workflow;
})();

$root.State = (function() {

    /**
     * Properties of a State.
     * @exports IState
     * @interface IState
     * @property {string|null} [txid] State txid
     * @property {IWorkflow|null} [workflow] State workflow
     * @property {State.Status|null} [status] State status
     * @property {string|null} [data] State data
     * @property {Array.<State.ITask>|null} [tasks] State tasks
     */

    /**
     * Constructs a new State.
     * @exports State
     * @classdesc Represents a State.
     * @implements IState
     * @constructor
     * @param {IState=} [properties] Properties to set
     */
    function State(properties) {
        this.tasks = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * State txid.
     * @member {string} txid
     * @memberof State
     * @instance
     */
    State.prototype.txid = "";

    /**
     * State workflow.
     * @member {IWorkflow|null|undefined} workflow
     * @memberof State
     * @instance
     */
    State.prototype.workflow = null;

    /**
     * State status.
     * @member {State.Status} status
     * @memberof State
     * @instance
     */
    State.prototype.status = 0;

    /**
     * State data.
     * @member {string} data
     * @memberof State
     * @instance
     */
    State.prototype.data = "";

    /**
     * State tasks.
     * @member {Array.<State.ITask>} tasks
     * @memberof State
     * @instance
     */
    State.prototype.tasks = $util.emptyArray;

    /**
     * Creates a new State instance using the specified properties.
     * @function create
     * @memberof State
     * @static
     * @param {IState=} [properties] Properties to set
     * @returns {State} State instance
     */
    State.create = function create(properties) {
        return new State(properties);
    };

    /**
     * Encodes the specified State message. Does not implicitly {@link State.verify|verify} messages.
     * @function encode
     * @memberof State
     * @static
     * @param {IState} message State message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    State.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.txid != null && message.hasOwnProperty("txid"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.txid);
        if (message.workflow != null && message.hasOwnProperty("workflow"))
            $root.Workflow.encode(message.workflow, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.status != null && message.hasOwnProperty("status"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.status);
        if (message.data != null && message.hasOwnProperty("data"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.data);
        if (message.tasks != null && message.tasks.length)
            for (var i = 0; i < message.tasks.length; ++i)
                $root.State.Task.encode(message.tasks[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified State message, length delimited. Does not implicitly {@link State.verify|verify} messages.
     * @function encodeDelimited
     * @memberof State
     * @static
     * @param {IState} message State message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    State.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a State message from the specified reader or buffer.
     * @function decode
     * @memberof State
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {State} State
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    State.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.State();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.txid = reader.string();
                break;
            case 2:
                message.workflow = $root.Workflow.decode(reader, reader.uint32());
                break;
            case 3:
                message.status = reader.int32();
                break;
            case 4:
                message.data = reader.string();
                break;
            case 5:
                if (!(message.tasks && message.tasks.length))
                    message.tasks = [];
                message.tasks.push($root.State.Task.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a State message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof State
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {State} State
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    State.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a State message.
     * @function verify
     * @memberof State
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    State.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.txid != null && message.hasOwnProperty("txid"))
            if (!$util.isString(message.txid))
                return "txid: string expected";
        if (message.workflow != null && message.hasOwnProperty("workflow")) {
            var error = $root.Workflow.verify(message.workflow);
            if (error)
                return "workflow." + error;
        }
        if (message.status != null && message.hasOwnProperty("status"))
            switch (message.status) {
            default:
                return "status: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.data != null && message.hasOwnProperty("data"))
            if (!$util.isString(message.data))
                return "data: string expected";
        if (message.tasks != null && message.hasOwnProperty("tasks")) {
            if (!Array.isArray(message.tasks))
                return "tasks: array expected";
            for (var i = 0; i < message.tasks.length; ++i) {
                var error = $root.State.Task.verify(message.tasks[i]);
                if (error)
                    return "tasks." + error;
            }
        }
        return null;
    };

    /**
     * Creates a State message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof State
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {State} State
     */
    State.fromObject = function fromObject(object) {
        if (object instanceof $root.State)
            return object;
        var message = new $root.State();
        if (object.txid != null)
            message.txid = String(object.txid);
        if (object.workflow != null) {
            if (typeof object.workflow !== "object")
                throw TypeError(".State.workflow: object expected");
            message.workflow = $root.Workflow.fromObject(object.workflow);
        }
        switch (object.status) {
        case "Open":
        case 0:
            message.status = 0;
            break;
        case "Error":
        case 1:
            message.status = 1;
            break;
        case "Complete":
        case 2:
            message.status = 2;
            break;
        }
        if (object.data != null)
            message.data = String(object.data);
        if (object.tasks) {
            if (!Array.isArray(object.tasks))
                throw TypeError(".State.tasks: array expected");
            message.tasks = [];
            for (var i = 0; i < object.tasks.length; ++i) {
                if (typeof object.tasks[i] !== "object")
                    throw TypeError(".State.tasks: object expected");
                message.tasks[i] = $root.State.Task.fromObject(object.tasks[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a State message. Also converts values to other types if specified.
     * @function toObject
     * @memberof State
     * @static
     * @param {State} message State
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    State.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.tasks = [];
        if (options.defaults) {
            object.txid = "";
            object.workflow = null;
            object.status = options.enums === String ? "Open" : 0;
            object.data = "";
        }
        if (message.txid != null && message.hasOwnProperty("txid"))
            object.txid = message.txid;
        if (message.workflow != null && message.hasOwnProperty("workflow"))
            object.workflow = $root.Workflow.toObject(message.workflow, options);
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = options.enums === String ? $root.State.Status[message.status] : message.status;
        if (message.data != null && message.hasOwnProperty("data"))
            object.data = message.data;
        if (message.tasks && message.tasks.length) {
            object.tasks = [];
            for (var j = 0; j < message.tasks.length; ++j)
                object.tasks[j] = $root.State.Task.toObject(message.tasks[j], options);
        }
        return object;
    };

    /**
     * Converts this State to JSON.
     * @function toJSON
     * @memberof State
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    State.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Status enum.
     * @name State.Status
     * @enum {string}
     * @property {number} Open=0 Open value
     * @property {number} Error=1 Error value
     * @property {number} Complete=2 Complete value
     */
    State.Status = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Open"] = 0;
        values[valuesById[1] = "Error"] = 1;
        values[valuesById[2] = "Complete"] = 2;
        return values;
    })();

    State.Task = (function() {

        /**
         * Properties of a Task.
         * @memberof State
         * @interface ITask
         * @property {IStage|null} [stage] Task stage
         * @property {State.Status|null} [status] Task status
         * @property {string|null} [address] Task address
         * @property {Array.<IUTXO>|null} [utxos] Task utxos
         * @property {string|null} [txid] Task txid
         */

        /**
         * Constructs a new Task.
         * @memberof State
         * @classdesc Represents a Task.
         * @implements ITask
         * @constructor
         * @param {State.ITask=} [properties] Properties to set
         */
        function Task(properties) {
            this.utxos = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Task stage.
         * @member {IStage|null|undefined} stage
         * @memberof State.Task
         * @instance
         */
        Task.prototype.stage = null;

        /**
         * Task status.
         * @member {State.Status} status
         * @memberof State.Task
         * @instance
         */
        Task.prototype.status = 0;

        /**
         * Task address.
         * @member {string} address
         * @memberof State.Task
         * @instance
         */
        Task.prototype.address = "";

        /**
         * Task utxos.
         * @member {Array.<IUTXO>} utxos
         * @memberof State.Task
         * @instance
         */
        Task.prototype.utxos = $util.emptyArray;

        /**
         * Task txid.
         * @member {string} txid
         * @memberof State.Task
         * @instance
         */
        Task.prototype.txid = "";

        /**
         * Creates a new Task instance using the specified properties.
         * @function create
         * @memberof State.Task
         * @static
         * @param {State.ITask=} [properties] Properties to set
         * @returns {State.Task} Task instance
         */
        Task.create = function create(properties) {
            return new Task(properties);
        };

        /**
         * Encodes the specified Task message. Does not implicitly {@link State.Task.verify|verify} messages.
         * @function encode
         * @memberof State.Task
         * @static
         * @param {State.ITask} message Task message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Task.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.stage != null && message.hasOwnProperty("stage"))
                $root.Stage.encode(message.stage, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.status != null && message.hasOwnProperty("status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            if (message.address != null && message.hasOwnProperty("address"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.address);
            if (message.utxos != null && message.utxos.length)
                for (var i = 0; i < message.utxos.length; ++i)
                    $root.UTXO.encode(message.utxos[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.txid != null && message.hasOwnProperty("txid"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.txid);
            return writer;
        };

        /**
         * Encodes the specified Task message, length delimited. Does not implicitly {@link State.Task.verify|verify} messages.
         * @function encodeDelimited
         * @memberof State.Task
         * @static
         * @param {State.ITask} message Task message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Task.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Task message from the specified reader or buffer.
         * @function decode
         * @memberof State.Task
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {State.Task} Task
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Task.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.State.Task();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.stage = $root.Stage.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.status = reader.int32();
                    break;
                case 3:
                    message.address = reader.string();
                    break;
                case 4:
                    if (!(message.utxos && message.utxos.length))
                        message.utxos = [];
                    message.utxos.push($root.UTXO.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.txid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Task message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof State.Task
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {State.Task} Task
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Task.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Task message.
         * @function verify
         * @memberof State.Task
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Task.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.stage != null && message.hasOwnProperty("stage")) {
                var error = $root.Stage.verify(message.stage);
                if (error)
                    return "stage." + error;
            }
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.address != null && message.hasOwnProperty("address"))
                if (!$util.isString(message.address))
                    return "address: string expected";
            if (message.utxos != null && message.hasOwnProperty("utxos")) {
                if (!Array.isArray(message.utxos))
                    return "utxos: array expected";
                for (var i = 0; i < message.utxos.length; ++i) {
                    var error = $root.UTXO.verify(message.utxos[i]);
                    if (error)
                        return "utxos." + error;
                }
            }
            if (message.txid != null && message.hasOwnProperty("txid"))
                if (!$util.isString(message.txid))
                    return "txid: string expected";
            return null;
        };

        /**
         * Creates a Task message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof State.Task
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {State.Task} Task
         */
        Task.fromObject = function fromObject(object) {
            if (object instanceof $root.State.Task)
                return object;
            var message = new $root.State.Task();
            if (object.stage != null) {
                if (typeof object.stage !== "object")
                    throw TypeError(".State.Task.stage: object expected");
                message.stage = $root.Stage.fromObject(object.stage);
            }
            switch (object.status) {
            case "Open":
            case 0:
                message.status = 0;
                break;
            case "Error":
            case 1:
                message.status = 1;
                break;
            case "Complete":
            case 2:
                message.status = 2;
                break;
            }
            if (object.address != null)
                message.address = String(object.address);
            if (object.utxos) {
                if (!Array.isArray(object.utxos))
                    throw TypeError(".State.Task.utxos: array expected");
                message.utxos = [];
                for (var i = 0; i < object.utxos.length; ++i) {
                    if (typeof object.utxos[i] !== "object")
                        throw TypeError(".State.Task.utxos: object expected");
                    message.utxos[i] = $root.UTXO.fromObject(object.utxos[i]);
                }
            }
            if (object.txid != null)
                message.txid = String(object.txid);
            return message;
        };

        /**
         * Creates a plain object from a Task message. Also converts values to other types if specified.
         * @function toObject
         * @memberof State.Task
         * @static
         * @param {State.Task} message Task
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Task.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.utxos = [];
            if (options.defaults) {
                object.stage = null;
                object.status = options.enums === String ? "Open" : 0;
                object.address = "";
                object.txid = "";
            }
            if (message.stage != null && message.hasOwnProperty("stage"))
                object.stage = $root.Stage.toObject(message.stage, options);
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.State.Status[message.status] : message.status;
            if (message.address != null && message.hasOwnProperty("address"))
                object.address = message.address;
            if (message.utxos && message.utxos.length) {
                object.utxos = [];
                for (var j = 0; j < message.utxos.length; ++j)
                    object.utxos[j] = $root.UTXO.toObject(message.utxos[j], options);
            }
            if (message.txid != null && message.hasOwnProperty("txid"))
                object.txid = message.txid;
            return object;
        };

        /**
         * Converts this Task to JSON.
         * @function toJSON
         * @memberof State.Task
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Task.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Task;
    })();

    return State;
})();

module.exports = $root;
