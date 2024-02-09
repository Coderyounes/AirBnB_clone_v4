$(document).ready(function() {
    $('input:checkbox').change(function() {
        let amenities_id = [];
        $('input:checkbox:checked').each(function() {
            amenities_id.push($(this).data("name"));
        });
        $('div.amenities h4').text(amenities_id.join(', '));
    });
});


$.get("http://0.0.0.0:5001/api/v1/status/", function(data, textStatus) {
    if (textStatus === 'success') {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    }
});

$.get("http://0.0.0.0:5001/api/v1/places_search/")
