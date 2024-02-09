$(document).ready(function() {
    $('input:checkbox').change(function() {
        let amenities_id = [];
        $('input:checkbox:checked').each(function() {
            amenities_id.push($(this).data("name"));
        });
        $('div.amenities h4').text(amenities_id.join(', '));
    });
});


$.get("http://127.0.0.1:5001/api/v1/status/", function(data, textStatus) {
    if (textStatus === 'success') {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    }
});

$.ajax({
    url: "http://127.0.0.1:5001/api/v1/places_search/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({}),
    success: function(response) {
        for (const place of response) {
            const template = `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest</div>
                  <div class="number_rooms">${place.number_rooms } Bedroom</div>
                  <div class="number_bathrooms">${ place.number_bathrooms } Bathroom</div>
            </div>
                <div class="description">
              ${place.description}
                </div>
          </article>`;
          $('section.places').append(template);
        }
    }
});

