$(document).ready(function() {
    $('input:checkbox').change(function() {
        let amenities_id = [];
        $('input:checkbox:checked').each(function() {
            amenities_id.push($(this).data("name"));
        });
        $('div.amenities h4').text(amenities_id.join(', '));
    });
});

