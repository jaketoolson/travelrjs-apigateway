import * as shell from "shelljs";

shell.mkdir('-p', 'dist');
shell.cp("-R", ".env", "dist/.env");
