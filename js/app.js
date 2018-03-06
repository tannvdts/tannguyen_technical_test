var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});

var EmployeeListItem = React.createClass({
    render: function () {
        return (
            <li className="table-view-cell media">
                <a href={"#employees/" + this.props.employee.login}>
                    <img className="media-object small pull-left" src={this.props.employee.avatar_url}/>
                    {this.props.employee.login}
                    <p>{this.props.employee.title}</p>
                </a>
            </li>
        );
    }
});

var EmployeeList = React.createClass({
    render: function () {
        var items = this.props.employees.map(function (employee) {
            return (
                <EmployeeListItem key={employee.id} employee={employee} />
            );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
        );
    }
});

var HomePage = React.createClass({
    componentDidMount: function() {
        this.props.searchHandler(this.props.searchKey);
    },
    render: function () {
        return (
            <div>
                <Header text="Home" back="false"/>

                <div className="content">
                    <h2>Top 5 GitHub Users</h2>
                    <p>Tab the username to see more information</p>
                    <EmployeeList employees={this.props.employees}/>
                </div>
            </div>
        );
    }
});

var EmployeePage = React.createClass({
    getInitialState: function() {
        return {employee: {}};
    },
    componentDidMount: function() {
        this.props.service.findById(this.props.employeeId).then(function(result) {
            this.setState({employee: result});
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header text="Employee" back="true"/>
                <div className="card">
                    <ul className="table-view">
                        <li className="table-view-cell media">
                            <img className="media-object big pull-left" src={this.state.employee.avatar_url }/>
                            <h1>{this.state.employee.name}</h1>
                            <p>{this.state.employee.location}</p>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            searchKey: 'a',
            employees: [],
            page: null
        }
    },
    searchHandler: function(searchKey) {
        employeeService.findByName(searchKey).then(function(employees) {
            this.setState({searchKey:searchKey, employees: employees, page: <HomePage searchKey={searchKey} searchHandler={this.searchHandler} employees={employees}/>});
        }.bind(this));
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.setState({page: <HomePage searchKey={this.state.searchKey} searchHandler={this.searchHandler} employees={this.state.employees}/>});
        }.bind(this));
        router.addRoute('employees/:id', function(id) {
            this.setState({page: <EmployeePage employeeId={id} service={employeeService}/>});
        }.bind(this));
        router.start();
    },
    render: function() {
        return this.state.page;
    }
});

React.render(<App/>, document.body);