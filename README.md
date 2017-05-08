# Mid-Level-Full-Stack // Tables
Testing AJAX JQuery Perl

### CGI-Bin
Modules used:
DBD::SQLite 
DBI 
HTTP::Server::Simple::CGI 
DBIx::JSON

#### test-dbi.pl

Run from terminal: `./test-dbi.pl`
Connects to SQLITE and creates database test.db in /data folder.
Creates table and headers.
Inserts dummy data.
Outputs database into JSON.

#### server.pl

Run from terminal: `./server.pl`
Creates a simple server to output html files.
Worked on adding extra pages / ext. css file(in progress).

#### create.pl, test-print.pl, test-html.pl

Test files/partials for 'test-dbi.pl'.

*Needed:* Connecting the file correctly for the JSON output. Research on CGI and DBI is a must.

### JAVASCRIPT

Dynamically creates table based on data from dummy file and/or form. 

Click on New to show form and add content. Cancel hides again. 

Data picker requires validation.

Submissions are added to local storage.

Search only shows current input value including recently added data.

*Needed:* Research settings for executing a perl script w/ params.

### DATA 

test.db is created by test-dbi.pl.

