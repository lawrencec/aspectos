namespace :jasmine do
    task :ci do
      require 'jasmine'
      load 'jasmine/tasks/jasmine.rake'
    ### rescue LoadError
    ###  task :jasmine do
    ###    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
    ###  end
    end
end

namespace :jshint do
  task :require do
    sh "which jshint" do |ok, res|
      fail 'Cannot find jshint on $PATH' unless ok
    end
  end

  task :check => 'jshint:require' do
    project_root = File.expand_path('', File.dirname(__FILE__))
    ### config_file = File.join(project_root, 'config', 'jshint.json')
    js_root_dir = File.join(project_root, 'src')

    files = Rake::FileList.new
    files.include File.join(js_root_dir, '**', '*.js')
    files.exclude File.join(js_root_dir, 'lib', '**', '*.js')
    print js_root_dir
    print js_root_dir
    ###sh "jshint #{files.join(' ')} --config #{config_file}" do |ok, res|
    sh "jshint #{files.join(' ')}" do |ok, res|
      fail 'JSHint found errors.' unless ok
    end
  end
end

desc 'Run JSHint checks against Javascript source'
task :jshint => 'jshint:check'

task :travis do
  ["rake jasmine:ci"].each do |cmd|
    puts "Starting to run #{cmd}..."
    system("export DISPLAY=:99.0 && bundle exec #{cmd}")
    raise "#{cmd} failed!" unless $?.exitstatus == 0
  end
end

desc "none"
task :none do
end

task :default => 'none'