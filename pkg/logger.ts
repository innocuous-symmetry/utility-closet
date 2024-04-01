import { Console } from "console";
import { PathLike, existsSync, mkdirSync, writeFileSync } from "fs";

type LogLevelOptions = {
    appendLog?: boolean;
    appendWarn?: boolean;
    appendError?: boolean;
    appendDebug?: boolean;
}

export class Logger extends Console implements Disposable {
    outfileLocation: PathLike;
    outfileName: `${string}.txt`;
    options: LogLevelOptions;
    contents = "";

    constructor(outfileLocation?: PathLike, outfileName?: `${string}.txt`, options?: LogLevelOptions) {
        super(process.stdout, process.stderr);
        this.outfileLocation = outfileLocation ?? process.cwd();
        this.outfileName = outfileName ?? "log.txt";

        this.options = {
            appendError: true,
            appendLog: true,
            ...options
        }
    }

    override log(...args: unknown[]) {
        this.append(args.join(" ") + "\n");
        super.log(...args);
    }

    override warn(...args: unknown[]) {
        this.append(args.join(" ") + "\n");
        super.warn(...args);
    }

    override error(...args: unknown[]) {
        this.append(args.join(" ") + "\n");
        super.error(...args);
    }

    private append(contents: string) {
        this.contents += contents;
    }

    private write() {
        try {
            if (!existsSync(this.outfileLocation)) mkdirSync(this.outfileLocation, { recursive: true })

            writeFileSync(
                `${this.outfileLocation.toString()}/${this.outfileName}`,
                this.contents,
                {
                    encoding: "utf-8",
                    flag: "a",
                }
            )

        } catch(e) {
            this.error(e);
        }
    }

    [Symbol.dispose]() {
        this.write();
    }
}
