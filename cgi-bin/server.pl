#!/usr/bin/perl
 {
 package MyWebServer;

 use HTTP::Server::Simple::CGI;
 use base qw(HTTP::Server::Simple::CGI); #server
 use CGI qw/:standard/; #start_html cgi

 my %dispatch = (
     '/' => \&resp_welcome,
     '/home' => \&resp_home,
     '/add' => \&resp_add
    #  '/styles/app.css' => \&addCSS,
     # ...
 );

 sub handle_request {
     my $self = shift;
     my $cgi  = shift;

     my $path = $cgi->path_info();
     my $handler = $dispatch{$path};

     if (ref($handler) eq "CODE") {
         print "HTTP/1.0 200 OK\r\n";
         $handler->($cgi);

     } else {
         print "HTTP/1.0 404 Not found\r\n";
         print $cgi->header,
               $cgi->start_html('Not found'),
               $cgi->h1('Page Not Found'),
               $cgi->end_html;
     }
 }
 sub resp_welcome {
    my $cgi = shift;
    print $cgi->header;
    print $cgi->start_html(
         -title =>"MyFooBar",
        # #  -script=> [ {-language => 'javascript',-src => $jquery}, {-code => $jscript} ],
        #  -head => [
        #     Link( { -href => 'styles/app.css',
        #             -hreflang => 'en',
        #             -rel      => 'stylesheet',
        #             -type     => 'text/css',
        #             -charset  => 'UTF-8'}),
        #   ]
        ),
          $cgi->h1('Search & Add :: Database'),
          $cgi->body("<table class=\"table_main\"><tr><th>DATE</th><th>TIME</th><th>DESCRIPTION</th></tr><tr><td></td><td></td><td></td></tr></table>"),
          $cgi->end_html;
 }

sub addCSS{
  my $cgi = shift;

  print $cgi->header('text/css');
  #load a file here, then print loaded file here.
  print "body { color:blue }";

}
 sub resp_add {
    my $cgi = shift;
    print $cgi->header,
    $cgi->start_html("is this my title"),
    $cgi->body("<table style='border:1px solid black'><tr><td>i'm in a table</td></tr></table>"),
    $cgi->end_html;

 }

 sub resp_home {
     my $cgi  = shift;   # CGI.pm object
     return if !ref $cgi;

     my $who = $cgi->param('name');

     print $cgi->header,
           $cgi->start_html("Hello"),
           $cgi->h1("Hello $who!"),
           $cgi->end_html;
 }

 }

 # start the server on port 8080
 my $pid = MyWebServer->new(8081)->background();
 print "Use 'kill $pid' to stop server.\n";
