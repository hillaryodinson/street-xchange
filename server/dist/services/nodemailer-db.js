"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodemailerDB = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
class NodemailerDB {
    constructor(db) {
        this._db = db;
        this._transporter = nodemailer_1.default.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false, // use SSL
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });
        this._hbsOptions = {
            viewEngine: {
                defaultLayout: "template",
                layoutsDir: __dirname + "/../views/mails",
            },
            viewPath: __dirname + "/../views/mails",
        };
    }
    dispatchMail(to, subject, template, context, from) {
        return __awaiter(this, void 0, void 0, function* () {
            //prepare the mail to be sent
            yield this._db.mail.create({
                data: {
                    to,
                    subject,
                    content: JSON.stringify({
                        template,
                        context,
                    }),
                    from,
                },
            });
        });
    }
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._transporter.use("compile", (0, nodemailer_express_handlebars_1.default)(this._hbsOptions));
                //send the mail
                yield this._transporter.sendMail(options, (err, info) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(info);
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.NodemailerDB = NodemailerDB;
