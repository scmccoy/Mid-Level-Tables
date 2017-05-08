#!/usr/bin/perl
use strict;
use warnings;

use DBI;

my $dbfile = "../data/test.db";

my $dsn      = "dbi:SQLite:dbname=$dbfile";
my $user     = "";
my $password = "";
my $dbh = DBI->connect($dsn, $user, $password, {
   PrintError       => 0,
   RaiseError       => 1,
   AutoCommit       => 1,
   FetchHashKeyName => 'NAME_lc',
});

my $sql = <<'END_SQL';
CREATE TABLE appt (
  id      INTEGER PRIMARY KEY,
  date    DATE,
  time    TIME,
  desc    VARCHAR(250)
)
END_SQL
$dbh->do($sql);
# insert data into db 
my $date = '2017-05-23';
my $time = '13:45:00',
my $desc = 'This is a description of the appt.';
$dbh->do('INSERT INTO appt (date, time, desc) VALUES (?, ?, ?)',
  undef,
  $date, $time, $desc);

$dbh->disconnect;
