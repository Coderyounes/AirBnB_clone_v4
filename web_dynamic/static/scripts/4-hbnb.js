var amenities_id = [];

$(document).ready(function() {
    $('input:checkbox').change(function() {
        const amenities = [];
        $('input:checkbox:checked').each(function() {
            var obj = {
                id: $(this).attr('data-id'),
                name: $(this).attr('data-name')
            };
            amenities.push(obj.name);
            if (!amenities_id.includes(obj.id)) {
                amenities_id.push(obj.id);
            }
        });
        $('input:checkbox:not(:checked)').each(function() {
            var idToRemove = $(this).attr('data-id');
            var index = amenities_id.indexOf(idToRemove);
            if (index !== -1) {
                amenities_id.splice(index, 1);
            }
        });
        $('div.amenities h4').text(amenities.join(', '));
        console.log(amenities_id);
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


$(document).ready(function() {
    $("button").click(function() {
        $.ajax({
            url: "http://127.0.0.1:5001/api/v1/places_search/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({amenities: amenities_id}),
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
    });
});

