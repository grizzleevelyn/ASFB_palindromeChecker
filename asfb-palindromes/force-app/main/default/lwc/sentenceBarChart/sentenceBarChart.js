import { LightningElement, api, track, wire } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chartJs';
import getChartSentence from '@salesforce/apex/createSentence.getChartSentence';

export default class LibsChartjs extends LightningElement {
    
    //receive parentId from parent LWC
    @api sentenceId;

    @track sentence;
    error;
    @track chart;
    chartjsInitialized = false;
    @track maxvalue;

    //configuration variable
    config = {
        type: 'bar',
        data: {
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        'rgb(192, 11, 92)', 
                        'rgb(191, 97, 215)',
                        'rgb(69, 15, 36)',
                        'rgb(197, 86, 186)',
                        'rgb(56, 7, 41)',
                        'rgb(124, 68, 225)',
                        'rgb(26, 243, 223)',
                        'rgb(159, 198, 55)',
                        'rgb(167, 69, 94)',
                        'rgb(173, 151, 102)'
                    ],
                    label: 'Numerical Characters'
                }
            ],
            labels: ['0', '1', '2', '3', '4',
                     '5', '6', '7', '8', '9']
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        stepSize: 1
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    };

    //wired function
    @wire(getChartSentence, {recordId: '$sentenceId'})
    wiredSentence({data, error}) {
        if(data) {
            this.sentence = data;
            //clear previous data
            this.config.data.datasets[0].data.length = [];

            this.config.data.datasets[0].data.push(data.X0__c);
            this.config.data.datasets[0].data.push(data.X1__c);
            this.config.data.datasets[0].data.push(data.X2__c);
            this.config.data.datasets[0].data.push(data.X3__c);
            this.config.data.datasets[0].data.push(data.X4__c);
            this.config.data.datasets[0].data.push(data.X5__c);
            this.config.data.datasets[0].data.push(data.X6__c);
            this.config.data.datasets[0].data.push(data.X7__c);
            this.config.data.datasets[0].data.push(data.X8__c);
            this.config.data.datasets[0].data.push(data.X9__c);

            this.chart.update();

        } else if(error) {
            this.error = error;
            alert('wired error')
        }
    }

    updateChart() {
        
        this.chart.update();
        
    }

    renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }

        Promise.all([
            loadScript(this, chartjs + '/Chart.min.js'),
            loadStyle(this, chartjs + '/Chart.min.css')
        ])
            .then(() => {
                // disable Chart.js CSS injection
                window.Chart.platform.disableCSSInjection = true;

                const canvas = document.createElement('canvas');
                this.template.querySelector('div.chart').appendChild(canvas);
                const ctx = canvas.getContext('2d');
                this.chart = new window.Chart(ctx, this.config);
            })
            .catch((error) => {
                this.error = error;
                alert(this.error);
            });

            
        this.chartjsInitialized = true;
    }
}