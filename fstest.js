var fs = require('fs');
var rimraf = require('rimraf');
//test making folder
fs.mkdtemp(__dirname + '/testfolder-', function(err, name) {	//works
	if(err) console.log(err);
	//test renaming folder
	fs.rename( name, __dirname + '/newtestfolder', function(err) { //works
		if(err) console.log(err);
		//test populating folder
		fs.writeFile(__dirname + '/newtestfolder/message.txt', 'HELLO WORLD', function(err) {
			if(err) throw err;
			//test deleting entire folder
			rimraf(__dirname + '/newtestfolder', function(err) {
				if(err) throw err;
			});
		});
	});
});