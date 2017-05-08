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

# CREATE TABLE
my $stmt = qq(CREATE TABLE APPOINTMENTS
  (ID INT PRIMARY KEY   NOT NULL,
   DATE           TEXT  NOT NULL,
   TIME           TEXT  NOT NULL,
   DESCRIPTION    CHAR(250)););

my $rv = $dbh->do($stmt);
  if($rv < 0) {
    print $DBI::errstr;
  } else {
    print "Table created successfully\n";
 }
  $stmt = qq(INSERT INTO APPOINTMENTS (ID, DATE, TIME, DESCRIPTION)
        VALUES (1, '2017-05-13', '07:55:00', 'The very first chicken'););
  $rv = $dbh->do($stmt) or die $DBI::errstr;

  $stmt = qq(INSERT INTO APPOINTMENTS (ID, DATE, TIME, DESCRIPTION)
        VALUES (2, '2017-05-14', '11:30:00', 'More chickens'););
  $rv = $dbh->do($stmt) or die $DBI::errstr;

  $stmt = qq(INSERT INTO APPOINTMENTS (ID, DATE, TIME, DESCRIPTION)
        VALUES (3, '2017-05-15', '09:30:00', 'Alas,.. chickens'););
  $rv = $dbh->do($stmt) or die $DBI::errstr;

  $stmt = qq(INSERT INTO APPOINTMENTS (ID, DATE, TIME, DESCRIPTION)
        VALUES (4, '2017-05-21', '14:40:00', 'Hordes of Chickens'););
  $rv = $dbh->do($stmt) or die $DBI::errstr;

  print "Records created successfully\n";

  #  convert to JSON
  my @output;
  # my $dbh = DBI->connect('dbi:Pg:dbname=foo','bar','baz');
  my $sth = $dbh->prepare('select DATE, TIME, DESCRIPTION from APPOINTMENTS');
  $sth->execute;

  while ( my $row = $sth->fetchrow_hashref ){
      push @output, $row;
  }

  my $cgi = CGI->new;
  print $cgi->header( 'application/json;charset=utf-8' );
  print to_json( { myData => \@output } );


  $dbh->disconnect();
