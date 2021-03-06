/***
 *
 * Apprise v2.5.7 - 2018-05-31 - Sgarbossa Domenico
 *
 * Custom version of original Apprise v2 from Daniel Raftery
 *
 * New features
 * - added support for textarea
 * - added support for radio buttons e group of radio buttons
 * - added support for attributes on buttons
 * - added support for locking Enter key (useful when editing textarea)
 * - added support for scrollable contents
 * - added support for buttons inline mode
 */

// Global Apprise variables
var $Apprise = null,
	$overlay = null,
	$body = null,
	$window = null,
	$cA = null,
	AppriseQueue = [];

// Add overlay and set opacity for cross-browser compatibility
jQuery(function() {
	$Apprise = jQuery('<div class="apprise">');
	$overlay = jQuery('<div class="apprise-overlay">');
	$body = jQuery("body");
	$window = jQuery(window);

	$body.append($overlay.css("opacity", ".94")).append($Apprise);
});

function Apprise(text, options) {
	// Restrict blank modals
	if (text === undefined || !text) {
		return false;
	}

	// Necessary variables
	var $me = this,
		$_inner = jQuery('<div class="apprise-inner">'),
		$_radios_container = jQuery(
			'<div class="apprise-radios" style="display: none;">'
		),
		$_buttons = jQuery('<div class="apprise-buttons">'),
		$_input = jQuery('<input type="text">');

	// Default settings (edit these to your liking)
	var settings = {
		animation: 700, // Animation speed
		width: "auto", // custom width in %
		buttons: {
			confirm: {
				action: function() {
					$me.dissapear();
				}, // Callback function
				className: null, // Custom class name(s)
				attrName: null,
				attrVal: null,
				id: "confirm", // Element ID
				text: "Ok" // Button text
			}
		},
		input: false, // input dialog
		textarea: false,
		override: true, // Override browser navigation while Apprise is visible
		enable_Enter: true,
		radio_groups: false,
		scrollable_content: false,
		buttons_inline: false,
		buttons_inline_min_height: 30
	};

	// Merge settings with options
	jQuery.extend(settings, options);

	// Close current Apprise, exit
	if (text == "close") {
		$cA.dissapear();
		return;
	}

	// If an Apprise is already open, push it to the queue
	if ($Apprise.is(":visible")) {
		AppriseQueue.push({ text: text, options: settings });

		return;
	}

	// Width adjusting function
	this.adjustWidth = function() {
		var window_width = $window.width(),
			w = "20%",
			l = "40%";

		if (window_width <= 800) {
			(w = "90%"), (l = "5%");
		} else if (window_width <= 1400 && window_width > 800) {
			(w = "70%"), (l = "15%");
		} else if (window_width <= 1800 && window_width > 1400) {
			(w = "50%"), (l = "25%");
		} else if (window_width <= 2200 && window_width > 1800) {
			(w = "30%"), (l = "35%");
		}

		// custom width
		if (settings.width != "auto" && parseInt(settings.width)) {
			w = parseInt(settings.width) + "%";
			l = Math.floor((100 - parseInt(settings.width)) / 2) + "%";
		}

		$Apprise.css("width", w).css("left", l);
	};

	// Close function
	this.dissapear = function() {
		$Apprise.animate(
			{
				top: "-100%"
			},
			settings.animation,
			function() {
				$overlay.fadeOut(300);
				$Apprise.hide();

				// Unbind window listeners
				$window.unbind("beforeunload");
				$window.unbind("keydown");

				// If in queue, run it
				if (AppriseQueue[0]) {
					Apprise(AppriseQueue[0].text, AppriseQueue[0].options);
					AppriseQueue.splice(0, 1);
				}
			}
		);

		return;
	};

	// Keypress function
	this.keyPress = function() {
		$window.bind("keydown", function(e) {
			// Close if the ESC key is pressed
			if (e.keyCode === 27) {
				if (settings.buttons.cancel) {
					jQuery(
						"#apprise-btn-" + settings.buttons.cancel.id
					).trigger("click");
				} else {
					$me.dissapear();
				}
			} else if (e.keyCode === 13) {
				if (settings.buttons.confirm) {
					jQuery(
						"#apprise-btn-" + settings.buttons.confirm.id
					).trigger("click");
				} else {
					if (settings.enable_Enter) $me.dissapear();
				}
			}
		});
	};

	// add radios groups
	jQuery.each(settings.radio_groups, function(i, radio_group) {
		if (radio_group) {
			var sub_container = "";
			var group_title = radio_group.title ? radio_group.title : "";
			if (Object.keys(radio_group.radios).length) {
				sub_container = '<div class="apprise-radios-sub-container">';

				// add section title
				sub_container +=
					'<div style="float:left;"><span>' +
					group_title +
					"</span></div>";

				// add group's radios
				sub_container += '<div style="float:rigth;">';
				jQuery.each(radio_group.radios, function(b, radio) {
					var checked = radio.checked ? "checked" : "";
					sub_container +=
						'<input type="radio" id="apprise-radio-' +
						radio.id +
						'" name="apprise-radio-' +
						i +
						'" ' +
						checked +
						' >&nbsp;<label for="apprise-radio-' +
						radio.id +
						'" ><span></span>' +
						radio.text +
						"</label>";
				});
				sub_container += "</div>";

				sub_container += "</div>";
			}

			// Add to radios group
			$_radios_container.css("display", "block");
			$_radios_container.append(sub_container);
		}
	});

	// Add buttons
	jQuery.each(settings.buttons, function(i, button) {
		if (button) {
			// Create button
			var $_button = jQuery(
				'<button id="apprise-btn-' + button.id + '">'
			).append(button.text);

			// Add custom class names
			if (button.className) {
				$_button.addClass(button.className);
			}

			// add custom attr
			if (button.attrName && button.attrVal) {
				$_button.attr(button.attrName, button.attrVal);
			}

			// Add to buttons
			$_buttons.append($_button);

			// Callback (or close) function
			$_button.on("click", function() {
				// Build response object
				var response = {
					clicked: button, // Pass back the object of the button that was clicked
					input: $_input.val() ? $_input.val() : null // User inputted text
				};

				button.action(response);
				//$me.dissapear();
			});
		}
	});

	// Disabled browser actions while open
	if (settings.override) {
		$window.bind("beforeunload", function(e) {
			return "An alert requires attention";
		});
	}

	// Adjust dimensions based on window
	$me.adjustWidth();

	$window.resize(function() {
		$me.adjustWidth();
	});

	// Append elements, show Apprise
	$Apprise
		.html("")
		.append(
			$_inner.append('<div class="apprise-content">' + text + "</div>")
		)
		.append($_radios_container)
		.append($_buttons);
	$cA = this;

	if (settings.input) {
		if (settings.textarea) {
			$_input = jQuery(
				'<textarea rows="' +
					(typeof settings.textarea == "number"
						? settings.textarea
						: 1) +
					'" ' +
					(settings.textarea_id
						? 'id="' + settings.textarea_id + '"'
						: "") +
					' style="width: 95%;">'
			);
		}
		$_inner
			.find(".apprise-content")
			.append(jQuery('<div class="apprise-input">').append($_input));
	}

	$overlay.fadeIn(300);
	$Apprise.show().animate(
		{
			top: "10%"
		},
		settings.animation,
		function() {
			$me.keyPress();
		}
	);

	// attivo contenuto scrollabile
	if (settings.scrollable_content) {
		jQuery("div.apprise .apprise-inner").css("overflow-y", "scroll");
	}

	// attivo modalità tasti in-line
	if (settings.buttons_inline) {
		jQuery("div.apprise .apprise-buttons").css({
			"display": "flex",
			"align-items": "center",
		});

		jQuery("div.apprise .apprise-buttons button").css({
			"display": "block",
			"min-height": settings.buttons_inline_min_height+"px",
		});
	}

	// Focus on input
	if (settings.input) {
		if (typeof settings.input == "string") $_input.val(settings.input);
		$_input.focus();
	}
} // end Apprise();
