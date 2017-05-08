#!/usr/bin/perl

use strict;
use warnings;
use CGI;
use DBI;
use JSON;

my $driver   = "SQLite";
my $database = "../data/test.db";
my $dsn = "DBI:$driver:dbname=$database";
my $userid = "";
my $password = "";
my $dbh = DBI->connect($dsn, $userid, $password, { RaiseError => 1 })
                      or die $DBI::errstr;
print "Opened database successfully\n";
#  new line
my @output;
# my $dbh = DBI->connect('dbi:Pg:dbname=foo','bar','baz');
my $sth = $dbh->prepare('select DATE, TIME, DESCRIPTION from APPOINTMENTS');
$sth->execute;

while ( my $row = $sth->fetchrow_hashref ){
    push @output, $row;
}

my $cgi = CGI->new;
print $cgi->header( 'application/json' );
print objToJson( { myData => \@output } );

print "Passed JSON command\n";
$dbh->disconnect();
