# Mid-Level-Full-Stack // Tables
Testing AJAX JQuery Perl

### CGI-Bin
* Modules used:
* DBD::SQLite 
* DBI 
* HTTP::Server::Simple::CGI 
* DBIx::JSON

#### test-dbi.pl

1. Run from terminal: `./test-dbi.pl`
2. Connects to SQLITE and creates database test.db in /data folder.
3. Creates table and headers.
4. Inserts dummy data.
5. Outputs database into JSON.

#### server.pl

1. Run from terminal: `./server.pl`
2. Creates a simple server to output html files.
3. Worked on adding extra pages / ext. css file(in progress).

#### create.pl, test-print.pl, test-html.pl

1. Test files/partials for 'test-dbi.pl'.

*Needed:* Connecting the file correctly for the JSON output. Research on CGI and DBI is a must.

### JAVASCRIPT

1. Dynamically creates table based on data from dummy file and/or form. 
2. Click on New to show form and add content. Cancel hides again. 
3. Data picker requires validation.
4. Submissions are added to local storage.
5. Search only shows current input value including recently added data.

*Needed:* Research settings for executing a perl script w/ params.

### DATA 

test.db is created by test-dbi.pl.

