require 'webrick'
server = WEBrick::HTTPServer.new :Port => 9292
server.mount "/", WEBrick::HTTPServlet::FileHandler, './src/tests'
trap('INT') { server.stop }
server.start