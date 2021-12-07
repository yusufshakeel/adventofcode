# AoC2021

This directory contains solutions for Advent Of Code 2021. Code is written is Python.

# Project creation

### Create Virtual Environment

Create a project directory and run the following command.

```shell
python3 -m venv virtualEnvironmentName
```

Example:

```shell
python3 -m venv venv
```

### Activate virtual environment

```shell
source venv/bin/activate
```

### Create requirements.txt file

This will hold the packages used in the project.

```shell
pip3 freeze > requirements.txt
```

# After project creation

## Getting started

Clone the project repository and install the packages.

### Install packages

```shell
pip3 install -r requirements.txt
```

### To run the tests

Run the following command.

```shell
pytest
```
