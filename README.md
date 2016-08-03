# web-browser-fuzzer
a simple web browser fuzzer written in node.js and radamsa fuzzer named Ava Fuzzer

Ava is a minimal web browser fuzzer . it's using radamsa to generate its test cases which makes it really relieable to find bugs . 

Ava takes the samples (PoC's, standard inputs or ...) provided by the user in the input folder and generate random testcases based on the provided inputs this technique makes it pretty scalable for more tests without changing the code .

usage: node fuzzer.js

to see more options use: node fuzzer.js -h

options :

Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -p, --port [port number]  web server port number (default port is : 8080)
    -a, --address [ip]        optional server ip address (default is localhost)
    -i, --input [dir]         directory of test cases (default is ./input)
    -o, --output [dir]        path to output folder (default is ./ouput)
    -t, --template [file]     template to generate test cases in it (default is template.mustache)
    -r, --randomize           randomize selection of input test cases (default is false)

