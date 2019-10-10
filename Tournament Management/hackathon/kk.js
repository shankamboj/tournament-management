function fxn()
{
    var dropdown = document.getElementById("colors");
    var opt = document.createElement("option"); 
    opt.text = 'something';
    opt.value = 'somethings value';
    dropdown.options.add(opt);
}