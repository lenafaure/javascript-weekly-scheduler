/**
 * Created by lenafaure on 20/09/2017.
 */

!function() {

    var today = moment();


    function Calendar(selector) {
        this.el = document.querySelector(selector);
        this.current_week = moment().week();
        this.draw_calendar();
        console.log(this);
    }

    Calendar.prototype.draw_calendar = function() {
        // Draw Header
        this.draw_header();
        // Draw Week

    }

    Calendar.prototype.draw_header = function() {
        // Refer to Calendar Object with "self"
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