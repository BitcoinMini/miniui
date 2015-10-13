# Mini
The Mini is a plug-and-play full Bitcoin node built on a Raspberry Pi 2+, Arch Linux, and Node.js. Bitcoin Core runs with a full local copy of the blockchain. We are designing the Mini to be extensible and enable users to add functionality in the for of "apps".

### Usage
This software was designed specifically for use this the Mini. We offer it free of charge under the MIT License, as is.

### Special Considerations
Your rpcpassword is located in bitcoin.conf. Make sure to update routes/api.js with that password.

Using the automated update included with this UI will overwrite any edits you may have made to the included files.

If you wish to run this without root privleges, simply change the port number in mini_server.js

----
Copyright (c) 2015 Bitcoin Mini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
