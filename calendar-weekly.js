/**
 * Created by lenafaure on 20/09/2017.
 */

!function() {

    var today = moment();

    function Calendar(selector) {
        this.el = document.querySelector(selector);
        this.current = moment().weekday(0);
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
                self.next_week();
            });

            var left = createElement('div', 'left');
            left.addEventListener('click', function () {
                self.prev_week();
            });

            // Append header elements to Calendar
            this.header.appendChild(this.title);
            this.header.appendChild(right);
            this.header.appendChild(left);
            this.el.appendChild(this.header);
        }

        this.title.innerHTML = "Semaine " + this.current.week();
    }

    Calendar.prototype.draw_week = function() {
        var self = this;

        if(this.week){
            this.old_week = this.week;
            this.old_week.className = 'week out ' + (self.next ? 'next' : 'prev');
            this.old_week.addEventListener('webkitAnimationEnd', function() {
                self.old_week.parentNode.removeChild(self.old_week);
                self.week = createElement('div', 'week');
                self.current_week();
                self.el.appendChild(self.week);
                window.setTimeout(function() {
                    self.week.className = 'week in ' + (self.next ? 'next' : 'prev');
                }, 16);
            });
        }
        else {
            this.week = createElement('div', 'week');
            this.el.appendChild(this.week);
            this.current_week();
            this.week.className = 'week current';
        }
    }

    Calendar.prototype.current_week = function() {
        var clone = this.current.clone();

        while(clone.week() === this.current.week()) {
            clone.add('days', 1);
            this.draw_day(clone);
            console.log(clone.format('MM/DD/YYYY'));
        }
    }

    Calendar.prototype.next_week = function() {
        this.current.add('weeks', 1);
        this.next = true;
        this.draw_calendar();
    }

    Calendar.prototype.prev_week = function() {
        this.current.subtract('weeks', 1);
        this.next = false;
        this.draw_calendar();
    }

    Calendar.prototype.draw_day = function(day) {
        var day_wrapper = createElement('div', this.get_day_class(day));
        var day_name = createElement('div', 'day-name', day.format('ddd'));
        var day_number = createElement('div', 'day-number', day.format('DD'));
        var day_month = createElement('div', 'day-month', day.format('MMM'));
        var day_slot = createElement('div', 'day-slot', 'book this day')
        day_wrapper.appendChild(day_name);
        day_wrapper.appendChild(day_number);
        day_wrapper.appendChild(day_month);
        day_wrapper.appendChild(day_slot);
        this.week.appendChild(day_wrapper);
    }

    // A function to add a different class to "today"
    Calendar.prototype.get_day_class = function(day) {
        classes = ['day'];

        if(day.week() !== this.current.week()) {
            classes.push('other');
        }
        else if(today.isSame(day, 'day')) {
            classes.push('today');
        }
        return classes.join(' ');
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