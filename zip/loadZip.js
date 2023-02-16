import ClassZip from './zip.js';
import ClassZipFS from './zip-fs.js';
import ClassZipEXT from './zip-ext.js';

import z_worker from './z-worker.js';
import inflate_worker from './inflate.js';
import deflate_worker from './deflate.js';


window.VRNzip = new ClassZipEXT(new ClassZipFS(new ClassZip(window, z_worker, inflate_worker, deflate_worker)));
window.VRNzip.Inflater = new inflate_worker().Inflater;
window.VRNzip.Deflater = new deflate_worker().Deflater;

var loadZip = function(url, cb = null, ercb = null) {
    var self = this;

    var validateZip = function(text) {
        var json = JSON.parse(text);
        if (typeof json.status !== "undefined" && json.status != null)
            if (json.status == 'OK') {
                if (typeof json.data !== "undefined" && json.data != null)
                    return json.data;
            }
        return false;
    };
    var zipFs = new VRNzip.fs.FS();


    //console.log(zipFs.importHttpContent);



    VRNzip.useWebWorkers = false;
    zipFs.importHttpContent(url, false, function() {
        var els = zipFs.root.children;
        var ret = {};
        for (var key in els) {
            var val = els[key];
            if (val.name == 'get_all_data.json')
                val.getText(function(data) {
                    var json = validateZip(data);
                    if (json) {
                        ret['all_data'] = json;
                        console.log('LOADED all_data');
                        if (ret['all_data'] && ret['all_karn_data'] && ret['multiple_cost'] && ret['all_actions'] && cb) cb(ret);
                    } else if (ercb) ercb(val.name);
                });
            if (val.name == 'get_all_karn_data.json')
                val.getText(function(data) {
                    var json = validateZip(data);
                    if (json) {
                        ret['all_karn_data'] = json;
                        console.log('LOADED all_karn_data');
                        if (ret['all_data'] && ret['all_karn_data'] && ret['multiple_cost'] && ret['all_actions'] && cb) cb(ret);
                    } else if (ercb) ercb(val.name);
                });
            if (val.name == 'get_multiple_cost.json')
                val.getText(function(data) {
                    var json = validateZip(data);
                    if (json) {
                        ret['multiple_cost'] = json;
                        console.log('LOADED multiple_cost');
                        if (ret['all_data'] && ret['all_karn_data'] && ret['multiple_cost'] && ret['all_actions'] && cb) cb(ret);
                    } else if (ercb) ercb(val.name);
                });
            if (val.name == 'get_all_actions.json')
                val.getText(function(data) {
                    var json = validateZip(data);
                    if (json) {
                        ret['all_actions'] = json;
                        console.log('LOADED all_actions');
                        if (ret['all_data'] && ret['all_karn_data'] && ret['multiple_cost'] && ret['all_actions'] && cb) cb(ret);
                    } else if (ercb) ercb(val.name);
                });
        };
    }, function(message) {
        console.error(message);
    }, function(progress) { console.log('loadZip', progress) });
    //delete zipFs;
};



export default loadZip;