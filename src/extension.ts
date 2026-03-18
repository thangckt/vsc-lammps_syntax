import { doc_entry, getCompletionList, getDocumentation, doc_completion_item } from "./doc_fcns";
import { createHover, getRangeFromPosition } from './hover_fcns';
import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {

	// Register Hover Provider
	context.subscriptions.push(
		vscode.languages.registerHoverProvider("lmps", {
			provideHover(document, position) {
				const command: string = getRangeFromPosition(document, position)
				const docs: doc_entry | undefined = getDocumentation(command)
				if (docs) {
					return createHover(docs, context)
				}
			}
		}));


	// Register Completions Provider
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider("lmps",
			{
				async resolveCompletionItem(item: vscode.CompletionItem): Promise<vscode.CompletionItem> {
					const autoConf = vscode.workspace.getConfiguration('lammps.AutoComplete')
					const item_doc = await doc_completion_item(autoConf, item);
					if (item_doc) {
						return item_doc
					} else {
						return item
					}
				},
				provideCompletionItems(
					document: vscode.TextDocument,
					position: vscode.Position,
					token: vscode.CancellationToken) {
					if (token.isCancellationRequested) {
						return Promise.resolve(new vscode.CompletionList([])); // Return an empty completion list
					}
					const linePrefix = document.lineAt(position).text.substring(0, position.character);
					// provide completion suggestion only at the beginning of the line
					if (linePrefix.search(RegExp('^\\s*[\\S]+\\s')) >= 0) {
						return undefined;
					} else {
						const autoConf = vscode.workspace.getConfiguration('lammps.AutoComplete')
						const compl_str: vscode.CompletionList = getCompletionList(autoConf)
						return compl_str
					}
				}
			}));
}
export function deactivate() {
}

