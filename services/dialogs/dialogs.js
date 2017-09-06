/**
 * Created by kolesnikov-a on 26/04/2016.
 */

const dialogsModule = angular.module('ui-dialogs', ['ui.bootstrap']);

dialogsModule.run(['$templateCache', function($templateCache){
    $templateCache.put('confirm.dialog.html', `
        <div class="modal-header bg-warning">
            <h3 class="modal-title">{{ vmConfirm.modalData.title }}</h3>
        </div>
        <div class="modal-body">
            <p>{{ vmConfirm.modalData.message }}</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="vmConfirm.ok()">Confirmar</button>
            <button class="btn btn-default" typer="button" ng-click="vmConfirm.cancel()">Cancelar</button>
        </div>`);

    $templateCache.put('error.dialog.html', `
        <div class="modal-header bg-danger">
            <h3 class="modal-title">{{ vmError.modalData.title }}</h3>
        </div>
        <div class="modal-body">
            <p>{{ vmError.modalData.message }}</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="vmError.ok()">OK</button>
        </div>`);

    $templateCache.put('notify.dialog.html', `
        <div class="modal-header bg-primary">
            <h3 class="modal-title">{{ vmNotify.modalData.title }}</h3>
        </div>
        <div class="modal-body">
            <p>{{ vmNotify.modalData.message }}</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" type="button" ng-click="vmNotify.ok()">OK</button>
        </div>`);

}]);

class DialogsService {
    constructor($uibModal){
        this._$uibModal = $uibModal;
    }

    confirm(title, message){
        return this._$uibModal.open({
            controller: 'dialogsCtrl as vmConfirm',
            templateUrl: 'confirm.dialog.html',
            resolve: {
                title: () => (title),
                message: () => (message)
            }
        })
    }

    error(title, message){
        return this._$uibModal.open({
            controller: 'dialogsCtrl as vmError',
            templateUrl: 'error.dialog.html',
            resolve: {
                title: () => (title),
                message: () => (message)
            }
        })
    }

    notify(title, message){
        return this._$uibModal.open({
            controller: 'dialogsCtrl as vmNotify',
            templateUrl: 'notify.dialog.html',
            resolve: {
                title: () => (title),
                message: () => (message)
            }
        })
    }

}

DialogsService.$inject = ['$uibModal'];

dialogsModule.service('dialogs', DialogsService);

class DialogsCtrl {
    constructor($uibModalInstance, title, message){
        this.modalData = {
            title: title,
            message: message
        };

        this._modalInstance = $uibModalInstance;
    }

    ok(){
        this._modalInstance.close();
    }

    cancel(){
        this._modalInstance.dismiss('cancel');
    }
}

DialogsCtrl.$inject = ['$uibModalInstance', 'title', 'message'];

dialogsModule.controller('dialogsCtrl', DialogsCtrl);