
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        files: require("./tools/export"),

        concat: {
            options: {
                banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= files %>',
                dest: '../client/src/game/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n'
            },
            build: {
                src: '<%= files %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        jshint: {
            build: {
                src: '<%= files %>'
            }
        }
    });

    //grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", ['concat']);
    //grunt.registerTask("all", ['concat', 'uglify']);
};