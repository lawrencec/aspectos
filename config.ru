require 'webrick'
server = WEBrick::HTTPServer.new :Port => 9292
server.mount "/", WEBrick::HTTPServlet::FileHandler, './'
trap('INT') { server.stop }
server.start