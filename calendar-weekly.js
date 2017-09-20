/**
 * Created by lenafaure on 20/09/2017.
 */

!function() {

    var today = moment();

    function Calendar(selector) {
        this.el = document.querySelector(selector);
        this.current = moment().weekday(1);
        this.current_week = moment().week();
        this.draw_calendar();
    }

    Calendar.prototype.draw_calendar = function() {
        // Draw Header
        this.draw_header();

        // Draw Week
        this.draw_week();
    }

    Calendar.prototype.draw_header = function() {
        // Refer to Calendar Object with "self" when "this" refers to an event
        var self = this;

        if(!this.header) {
            // Create header elements
            this.header = createElement('div', 'header');
            this.title = createElement('h1');

            var right = createElement('div', 'right');
            right.addEventListener('click', function () {
                self.nextWeek();
            });

            var left = createElement('div', 'left');
            left.addEventListener('click', function () {
                self.prevWeek();
            });

            // Append header elements to Calendar
            this.header.appendChild(this.title);
            this.header.appendChild(right);
            this.header.appendChild(left);
            this.el.appendChild(this.header);
        }

        this.title.innerHTML = "Semaine " + this.current_week;
    }

    Calendar.prototype.draw_week = function() {
        var self = this;

        this.week = createElement('div', 'week');
        this.el.appendChild(this.week);
        this.back_fill();
        this.forward_fill();
    }

    Calendar.prototype.back_fill = function() {
        var clone = this.current.clone();
        var first_day_of_week = clone.day();

        clone.subtract('days', first_day_of_week);

        for(var i = first_day_of_week; i > 0 ; i--) {
            console.log(clone.add('days', 1));
        }
    }

    Calendar.prototype.forward_fill = function() {
        var clone = this.current.clone().add('weeks', 1);
        var last_day_of_week = clone.day();

        if(last_day_of_week === 6) { return; }

        for(var i = last_day_of_week; i <= 7 ; i++) {
            clone.add('days', 1);
            console.log(clone.day());
            console.log(moment().weekday(i));
        }
    }

    // A function to create html elements
    function createElement(tagName, className, innerText) {
        var html_element = document.createElement(tagName);
        if(className) {
            html_element.className = className;
        }
        if(innerText) {
            html_element.innderText = html_element.textContent = innerText;
        }
        return html_element;
    }

    var calendar = new Calendar('#calendar');

}();