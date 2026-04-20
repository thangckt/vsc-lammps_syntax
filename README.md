# LAMMPS Syntax in VSCode

A minimal VSCode extension concisely for highlighting LAMMPS input files.

This extension is originally derived from [lammps_vscode](https://github.com/ThFriedrich/lammps_vscode), which minimizes memory usage and eliminates unnecessary dependencies by removing uncommon features.


## Features

- Highlight the keywords in LAMMPS input files.
- Recognizes `*.lmp`, `*.lmps`, `*.lammps`, and `in.*` files as LAMMPS input files.
- Folding possible between Markers #[ and #]

## Extension Settings

- `lammps.AutoComplete.Setting`: Controls the behaviour of the autocompletion feature. This setting may influence the performance of the extension.
- `lammps.Hover.Detail`: Control the length of the displayed description in the hover popup.
- `lammps.Hover.Enabled`: Display command information in a popup when hovering over a command or keyword.
- `lammps.Hover.Examples`: Display example usage in the hover popup.

## Usage

![Syntax Highlighting](image/example.gif)
